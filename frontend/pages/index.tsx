import Head from "next/head";
import CreatePostCardExtended from "../components/post/createPostCardExtended";
import CreatePostCardMini from "../components/post/createPostCardMini";
import PostCard from "../components/post/postCard";
import { createClient } from "../apolloClient";
import { GetPosts } from "../lib/query";
import { Post } from "../typedeclaration";
import { CleanPostResponseArray } from "../helper_functions/cleanStrapiResponse";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/layout";
import cookieCutter from "cookie-cutter"
import Loader from "../components/post/loader";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [jwt, setjwt] = useState('')
  const [postCardExtendedIsVisible, setpostCardExtendedIsVisible] =
    useState(false);

  useEffect(()=>{
    setjwt(cookieCutter.get("jwt"))
    const client = createClient(cookieCutter.get("jwt"));
    client.query({
      query: GetPosts,
    }).then((res)=>{
      if (res.data.posts.data !== null) {
      setPosts(CleanPostResponseArray(res.data.posts.data))
      setIsLoading(false)
    }

    }).catch((err)=>console.log(err))

    },[])
  const changePostCardExtendedState = (state: boolean) => {
    setpostCardExtendedIsVisible(state);
  };
  if (isLoading) return <Loader/>
  return (
    <Layout>
      <div
        className={`min-h-screen ${
          postCardExtendedIsVisible ? "h-screen" : ""
        }`}
      >
        <Head>
          <title>VetGhat</title>
          <meta name="description" content="Developed by Ashish" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="space-y-5 flex flex-col items-center mt-5">
          <CreatePostCardMini
            openPostCardExtended={changePostCardExtendedState}
          />
          {postCardExtendedIsVisible && (
            <CreatePostCardExtended
              jwt={jwt}
              closePostCardExtended={changePostCardExtendedState}
            />
          )}
          {posts && posts.map((post: Post, index) => {
            return <PostCard key={index} post={post} />;
          })}
        </div>
      </div>
    </Layout>
  );
}

