import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { AlertType, Post, UserDetails } from "../typedeclaration";
import {
  CleanPostResponseArray,
  CleanUserDetailsResponse,
} from "../helper_functions/cleanStrapiResponse";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/layout";
import Loader from "../components/post/loader";
import LeftSidebar from "../components/leftsidebar/leftsidebar";
import RightSidebar from "../components/rightsidebar/rightsidebar";
import Axios from "../axios";
import GlobalAlert from "../components/alert/globalalert";
import { Socket } from "socket.io-client";

export default function Home({ socket }: { socket: Socket }) {
  const [posts, setPosts] = useState<Post[]>();
  const [followingsPosts, setFollowingsPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);
  const [alert, setAlert] = useState<AlertType>();
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [poststype, setPostsType] = useState("allposts");
  const postTypeSelect = useRef<any>();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // Getting posts from user you follow
  const getFollowingsPosts = (page: number) => {
    Axios()
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
          setFollowingsPosts(CleanPostResponseArray(res.data));
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  // Getting posts
  const getPosts = (page: number) => {
    console.log("pagenumber", page);
    Axios()
      .get(`${process.env.STRAPI_URL}/api/posts`, {
        params: {
          pagination: { page: page },
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
        setPageCount(res.data.meta.pagination.pageCount);
        console.log(res);
        console.log("posts", res.data.data);
        if (res.data.data !== null) {
          setPosts(CleanPostResponseArray(res.data.data));
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const updatePosts = (page: number) => {
    if (postTypeSelect.current?.value === "allposts") {
      getPosts(page);
    } else if (postTypeSelect.current?.value === "followings") {
      getFollowingsPosts(page);
    }
  };

  useEffect(() => {
    // Getting users
    const userOnLocalStorage = localStorage.getItem("user");
    if (userOnLocalStorage === null) {
      Axios()
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
          const temp = CleanUserDetailsResponse(res.data);
          console.log("temp", temp)
          localStorage.setItem("user", JSON.stringify(temp));
          setUserDetails(temp);
        })
        .catch((err) => console.log(err));
    } else {
      const user = JSON.parse(userOnLocalStorage);
      setUserDetails(user)
    }

    getPosts(page);
    getFollowingsPosts(page);

    //  wait until socket connects before adding event listeners
    if (socket) {
      socket.on("post:create", () => {
        updatePosts(page);
      });
      socket.on("likesUpdated", () => {
        updatePosts(page);
      });
      socket.on("comment:create", () => {
        updatePosts(page);
      });
      socket.on("post:delete", () => {
        updatePosts(page);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePrev = () => {
    setPage(page - 1);
    updatePosts(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
    updatePosts(page + 1);
  };

  const handlePostsTypeChange = (e: any) => {
    setPostsType(e.target.value);
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
          {alert && (
            <div>
              <GlobalAlert type={alert.type} body={alert.body} />
            </div>
          )}
          <LeftSidebar user={userDetails} />
          <div className="w-4/5 md:w-1/2 lg:w-1/3 space-y-5 flex flex-col items-center mt-5 pb-[60px]">
            <CreatePostCardMini
              openPostCardExtended={changePostCardExtendedState}
              user={userDetails}
            />
            {postCardExtendedIsVisible && (
              <CreatePostCardExtended
                setAlert={setAlert}
                closePostCardExtended={changePostCardExtendedState}
                user={userDetails}
              />
            )}
            <select
              ref={postTypeSelect}
              value={poststype}
              className="self-start px-5 py-3 bg-white font-semibold cursor-pointer text-gray-600 outline-none"
              onChange={handlePostsTypeChange}
            >
              <option value="allposts">All Posts</option>
              <option value="followings">Followings</option>
            </select>
            {poststype === "allposts" &&
              posts &&
              posts.map((post: Post, index) => {
                return (
                  <PostCard
                    socket={socket}
                    setAlert={setAlert}
                    key={index}
                    post={post}
                  />
                );
              })}
            {poststype === "followings" &&
              followingsPosts &&
              followingsPosts.map((post: Post, index) => {
                return (
                  <PostCard
                    socket={socket}
                    setAlert={setAlert}
                    key={index}
                    post={post}
                  />
                );
              })}
            {pageCount > 1 && (
              <div>
                {page !== 1 && (
                  <button
                    className="px-4 py-2 bg-gray-800 m-5 text-white"
                    onClick={handlePrev}
                  >
                    Prev
                  </button>
                )}
                {page !== pageCount && (
                  <button
                    className="px-4 py-2 bg-gray-800 m-5 text-white"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
          <RightSidebar />
        </div>
      )}
    </Layout>
  );
}
