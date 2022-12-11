import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { client } from "../apolloClient";
import { GetServerSideProps, GetStaticProps } from "next";
import { GetPosts } from "../lib/query";
import { Post } from "../typedeclaration";
import { CleanPostResponseArray } from "../helper_functions/cleanStrapiResponse";
import { useState } from "react";
import { requireAuthentication } from "../HOC/authentication/authentication";


export default function Home({ posts }: { posts: Post[] }) {
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);
  const changePostCardExtendedState = (state: boolean) => {
    setpostCardExtendedIsVisible(state);
  };
  return (
    <div className={`min-h-screen ${postCardExtendedIsVisible? 'h-screen overflow-hidden' : ''}`}>
      <Head>
        <title>VetGhat</title>
        <meta name="description" content="Developed by Ashish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-5">
        <CreatePostCardMini
          openPostCardExtended={changePostCardExtendedState}
        />
        {postCardExtendedIsVisible && (
          <CreatePostCardExtended
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

export const getServerSideProps = requireAuthentication(
  async(ctx)=>{
    const { data } = await client.query({
      query: GetPosts,
    });
    return {
      props: {
        posts: CleanPostResponseArray(data.posts.data),
      },
    };
  }
)