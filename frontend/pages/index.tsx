import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { AlertType, Post, UserDetails } from "../typedeclaration";
import {
  CleanPostResponseArray,
  CleanUserDetailsResponse,
} from "../helper_functions/cleanStrapiResponse";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/layout";
import cookieCutter from "cookie-cutter";
import Loader from "../components/post/loader";
import LeftSidebar from "../components/leftsidebar/leftsidebar";
import RightSidebar from "../components/rightsidebar/rightsidebar";
import Axios from "../axios";
import GlobalAlert from "../components/alert/globalalert";
import { Socket } from "socket.io-client";

export default function Home({ socket }: { socket: Socket }) {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setjwt] = useState("");
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);
  const [alert, setAlert] = useState<AlertType>();
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [poststype, setPostsType] = useState("allposts");

  useEffect(() => {
    const jwt = cookieCutter.get("jwt");

    setjwt(cookieCutter.get("jwt"));
    // Getting users
    Axios(jwt)
      .get(`${process.env.STRAPI_URL}/api/users/me`, {
        params: {
          populate: [
            "profilepic",
            "posts",
            "posts.content",
            "posts.hearts",
            "posts.comments",
            "followers",
            "followings",
          ],
        },
      })
      .then((res) => {
        console.log("user", res.data);
        setUserDetails(CleanUserDetailsResponse(res.data));
      })
      .catch((err) => console.log(err));

    // Getting posts
    const getPosts = () => {
      if (poststype === "allposts") {
        Axios(jwt)
          .get(`${process.env.STRAPI_URL}/api/posts`, {
            params: {
              populate: [
                "author.profilepic",
                "author.posts",
                "content",
                "comments",
                "comments.author",
                "comments.author.profilepic",
                "hearts",
                "hearts.profilepic",
              ],
              sort: ["createdAt:desc"],
            },
          })
          .then((res) => {
            console.log("posts", res.data.data);
            if (res.data.data !== null) {
              setPosts(CleanPostResponseArray(res.data.data));
              setIsLoading(false);
            }
          })
          .catch((err) => console.log(err));
      } else if (poststype === "followings") {
        Axios(jwt)
          .get(`${process.env.STRAPI_URL}/api/findfriendsposts`, {
            params: {
              populate: [
                "author.profilepic",
                "author.posts",
                "content",
                "comments",
                "comments.author",
                "comments.author.profilepic",
                "hearts",
                "hearts.profilepic",
              ],
              sort: ["createdAt:desc"],
            },
          })
          .then((res) => {
            console.log("posts", res.data);
            if (res.data !== null && res.data.length !== 0) {
              setPosts(CleanPostResponseArray(res.data));
              setIsLoading(false);
            }
          })
          .catch((err) => console.log(err));
      }
    };
    getPosts();
    //  wait until socket connects before adding event listeners
    if (socket) {
      socket.on("post:create", () => {
        getPosts();
      });
      socket.on("likesUpdated",()=>{
        console.log("fired")
        getPosts();
      })
      socket.on("comment:create", () => {
        getPosts();
      });
    }
  }, [poststype]);

  const handlePostsTypeChange = (e: any) => {
    setPostsType(e.target.value);
    setIsLoading(true);
  };

  const changePostCardExtendedState = (state: boolean) => {
    setpostCardExtendedIsVisible(state);
  };

  if (isLoading) return <Loader />;
  return (
    <Layout>
      {userDetails && (
        <div
          className={`min-h-screen flex justify-center ${
            postCardExtendedIsVisible ? "h-screen" : ""
          }`}
        >
          <Head>
            <title>VetGhat</title>
            <meta name="description" content="Developed by Ashish" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {alert && (
            <div>
              <GlobalAlert type={alert.type} body={alert.body} />
            </div>
          )}
          <LeftSidebar user={userDetails} />
          <div className="w-4/5 md:w-1/2 lg:w-1/3 space-y-5 flex flex-col items-center mt-5">
            <CreatePostCardMini
              openPostCardExtended={changePostCardExtendedState}
              user={userDetails}
            />
            {postCardExtendedIsVisible && (
              <CreatePostCardExtended
                setAlert={setAlert}
                jwt={jwt}
                closePostCardExtended={changePostCardExtendedState}
                user={userDetails}
              />
            )}
            <select value={poststype} className="self-start px-5 py-3 bg-white font-semibold cursor-pointer text-gray-600" onChange={handlePostsTypeChange}>
              <option value="allposts">All Posts</option>
              <option value="followings">Followings</option>
            </select>
            {posts &&
              posts.map((post: Post, index) => {
                return <PostCard socket={socket} setAlert={setAlert} key={index} post={post} />;
              })}
          </div>
          <RightSidebar />
        </div>
      )}
    </Layout>
  );
}
