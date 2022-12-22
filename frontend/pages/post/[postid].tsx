import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CleanPostResponse } from "../../helper_functions/cleanStrapiResponse";
import { Post } from "../../typedeclaration";
import Layout from "../../components/Layout/layout";
import Axios from "../../axios";
import Image from "next/image";
import UserAvatar from "../../components/reusables/userAvatar";
import Link from "next/link";
import { GetTimeDifference } from "../../helper_functions/getTimeDifference";
import ImageCarousel from "../../components/post/imageCarousel";
import { AiOutlineSend } from "react-icons/ai";
import Comment from "../../components/post/comment";
import Head from "next/head";
import SinglePostLoader from "../../components/post/singlePostLoader";

const SinglePost = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();
  const router = useRouter();
  useEffect(() => {
    if (router.query.postid) {
      const postid = router.query.postid;
      const jwt = cookieCutter.get("jwt");

      Axios(jwt)
        .get(`${process.env.STRAPI_URL}/api/posts/${postid}`, {
          params: {
            populate: [
              "author",
              "author.profilepic",
              "content",
              "hearts",
              "hearts.profilepic",
              "comments",
              "comments.author",
              "comments.author.profilepic",
            ],
          },
        })
        .then((res) => {
          console.log(res);
          setPost(CleanPostResponse(res.data.data));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [router]);

  if (loading) {
    return <SinglePostLoader />;
  }
  return (
    <Layout>
      {post && (
        <div className="h-[80vh] flex bg-white m-5 space-x-5 ">
          <Head>
            <title>Post-{post.author.username}</title>
            <meta name="description" content="Developed by Ashish" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="overflow-hidden h-full w-1/2 bg-black">
            {post.content.length > 1 ? (
              <ImageCarousel singlePost={true} images={post.content} />
            ) : (
              <Image
                draggable="false"
                className="h-full w-full object-contain"
                alt="post-image"
                src={process.env.STRAPI_URL + post.content[0].url}
                width={800}
                height={800}
                priority={true}
              />
            )}
          </div>
          <div className="flex-grow relative">
            <div className="p-5 space-y-5">
              <div className="flex items-center space-x-5 flex-grow p-3 border-b">
                <UserAvatar src={post.author.profilepic.url} />
                <div className="">
                  <Link
                    href={`/profile/${post.author.id}`}
                    className="font-bold hover:underline"
                  >
                    {post.author.username}
                  </Link>
                </div>
              </div>
              {post.caption && (
                <div className="px-5 flex items-center space-x-3">
                  <Image
                    className="rounded-full"
                    width={40}
                    height={40}
                    alt={`${post.author.username}-profilepic`}
                    src={process.env.STRAPI_URL + post.author.profilepic.url}
                  />
                  <div>
                    <span className="font-semibold pr-3">
                      {post.author.username}
                    </span>
                    <span>{post.caption}</span>
                    <p className="text-gray-400 text-sm">
                      {GetTimeDifference(post.postedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {post.comments.length !== 0 ? (
              post.comments.map((cmnt, index) => (
                <Comment key={index} cmnt={cmnt} />
              ))
            ) : (
              <div className="text-center p-20 text-gray-300 w-full">
                No comments
              </div>
            )}
            <form className="absolute bottom-0 left-0 right-0 flex items-center px-3 m-5 pt-5 h-10 border-t">
              <input
                className="bg-transparent flex-grow outline-none"
                type="text"
                placeholder="Write a Comment"
              />
              <AiOutlineSend className="text-2xl text-blue-400" />
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SinglePost;
