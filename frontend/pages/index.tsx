import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { AlertType, Post, UserDetails } from "../typedeclaration";
import {
  CleanPostResponseArray,
  CleanUserDetailsResponse,
} from "../helper_functions/cleanStrapiResponse";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/layout";
import cookieCutter from "cookie-cutter";
import Loader from "../components/post/loader";
import LeftSidebar from "../components/leftsidebar/leftsidebar";
import RightSidebar from "../components/rightsidebar/rightsidebar";
import Axios from "../axios";
import GlobalAlert from "../components/alert/globalalert";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setjwt] = useState("");
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);
  const [alert, setalert] = useState<AlertType>();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    id: "default",
    profilepic: { url: "/" },
    username: "default",
    bio: "",
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    posts: [
      {
        id: "default",
        thumbnail: { url: "/" },
        multiImages: false,
        heartcount: 0,
        commentcount: 0,
      },
    ],
  });

  useEffect(() => {
    const jwt = cookieCutter.get("jwt");

    const { io } = require("socket.io-client");

    // token will be verified, connection will be rejected if not a valid JWT
    const socket = io(process.env.STRAPI_URL, {
      auth: {
        token: jwt,
      },
    });

    //  wait until socket connects before adding event listeners
    socket.on("connect", () => {
      console.log("connected");
      socket.on("post:create", async() => {
        await setalert({
          type: "success",
          body: "Post Created Successfully",
        });
        setInterval(() => {
          setalert(undefined);
        }, 3000);
        getPosts();
      });
      socket.on("comment:create", async() => {
        await setalert({
          type: "success",
          body: "Comment added Successfully",
        });
        setInterval(() => {
          setalert(undefined);
        }, 3000);
        getPosts();
        console.log("comment added");
      });
    });

    setjwt(cookieCutter.get("jwt"));
    // Getting users
    Axios(jwt)
      .get(`${process.env.STRAPI_URL}/api/users/me`, {
        params: {
          populate: [
            "profilepic",
            "posts",
            "posts.content",
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
              "hearts.profilepic"
            ],
            sort: "createdAt:desc",
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
    };
    getPosts();
  }, []);
  const changePostCardExtendedState = (state: boolean) => {
    setpostCardExtendedIsVisible(state);
  };
  if (isLoading) return <Loader />;
  return (
    <Layout>
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
        <div className="w-2/3 md:w-1/2 lg:w-1/3 space-y-5 flex flex-col items-center mt-5">
          <CreatePostCardMini
            openPostCardExtended={changePostCardExtendedState}
            user={userDetails}
          />
          {postCardExtendedIsVisible && (
            <CreatePostCardExtended
              jwt={jwt}
              closePostCardExtended={changePostCardExtendedState}
              user={userDetails}
            />
          )}
          {posts &&
            posts.map((post: Post, index) => {
              return <PostCard key={index} post={post} />;
            })}
        </div>
        <RightSidebar />
      </div>
    </Layout>
  );
}
