import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { createClient } from "../apolloClient";
import { GetPosts, GetProfile } from "../lib/query";
import { Post, User } from "../typedeclaration";
import {
  CleanPostResponseArray,
  CleanUserResponse,
} from "../helper_functions/cleanStrapiResponse";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/layout";
import cookieCutter from "cookie-cutter";
import Loader from "../components/post/loader";
import LeftSidebar from "../components/leftsidebar/leftsidebar";
import RightSidebar from "../components/rightsidebar/rightsidebar";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setjwt] = useState("");
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);
  const [userDetails, setUserDetails] = useState<User>({
    id: "default",
    profilepic: { url: "/" },
    username: "default",
    followersCount: 0,
    followingCount: 0,
    posts: 0,
  });

  const getPosts = (client:ApolloClient<NormalizedCacheObject>) =>{
    client
    .query({
      query: GetPosts,
    })
    .then((res) => {
      if (res.data.posts.data !== null) {
        setPosts(CleanPostResponseArray(res.data.posts.data));
        setIsLoading(false);
      }
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    setjwt(cookieCutter.get("jwt"));
    const client = createClient(cookieCutter.get("jwt"));
    // Getting profile info
    client
      .query({
        query: GetProfile,
        variables: {
          id: cookieCutter.get("uid"),
        },
      })
      .then((res) => {
        if (res.data.usersPermissionsUser.data !== null) {
          setUserDetails(CleanUserResponse(res.data.usersPermissionsUser));
        }
      })
      .catch((err) => console.log(err));
      getPosts(client)
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
              refreshPosts = {getPosts}
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
