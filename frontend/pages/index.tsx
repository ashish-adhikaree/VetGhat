import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { createClient } from "../apolloClient";
import { GetPosts } from "../lib/query";
import { Post } from "../typedeclaration";
import { CleanPostResponseArray } from "../helper_functions/cleanStrapiResponse";
import { useState } from "react";
import { parseCookie } from "../lib/parseCookies";


export default function Home({ posts, jwt }: { posts: Post[], jwt:string }) {
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);
  const changePostCardExtendedState = (state: boolean) => {
    setpostCardExtendedIsVisible(state);
  };
  return (
    <div className={`min-h-screen ${postCardExtendedIsVisible? 'h-screen' : ''}`}>
      <Head>
        <title>VetGhat</title>
        <meta name="description" content="Developed by Ashish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-5 flex flex-col items-center">
        <CreatePostCardMini
          openPostCardExtended={changePostCardExtendedState}
        />
        {postCardExtendedIsVisible && (
          <CreatePostCardExtended
            jwt = {jwt}
            closePostCardExtended={changePostCardExtendedState}
          />
        )}
        {posts.map((post: Post, index) => {
          return <PostCard key={index} post={post} />;
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async(ctx: any)=>{
    const { req } = ctx;
    const cookies = parseCookie(req);
    const client = createClient(cookies.jwt)
    const { data } = await client.query({
      query: GetPosts,
    });
    return {
      props: {
        posts: CleanPostResponseArray(data.posts.data),
        jwt: cookies.jwt
      },
    };
  }
