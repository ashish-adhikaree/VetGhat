import cookieCutter from "cookie-cutter";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { CleanPostResponse } from "../../helper_functions/cleanStrapiResponse";
import { AlertType, Post } from "../../typedeclaration";
import Layout from "../../components/Layout/layout";
import Axios from "../../axios";
import Image from "next/image";
import UserAvatar from "../../components/reusables/userAvatar";
import Link from "next/link";
import { GetTimeDifference } from "../../helper_functions/getTimeDifference";
import ImageCarousel from "../../components/post/imageCarousel";
import {
  AiFillCopy,
  AiFillDelete,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineSend,
} from "react-icons/ai";
import Comment from "../../components/post/comment";
import Head from "next/head";
import SinglePostLoader from "../../components/post/singlePostLoader";
import GlobalAlert from "../../components/alert/globalalert";
import { Socket } from "socket.io-client";
import HeartCard from "../../components/post/heartCard";
import { FiMoreHorizontal } from "react-icons/fi";

const SinglePost = ({ socket }: { socket: Socket }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();
  const [jwt, setjwt] = useState("");
  const comment = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [alert, setAlert] = useState<AlertType>();
  const [loved, setLoved] = useState(false);
  const [uid, setUID] = useState<string>("");
  const [showHearts, setShowHearts] = useState(false);
  const [postActionOpened, setPostActionOpened] = useState<boolean>(false);
  const [isDeleteBoxVisible, setDeleteBoxVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.postid) {
      const postid = router.query.postid;

      const jwt = cookieCutter.get("jwt");
      setjwt(jwt);
      setUID(cookieCutter.get("uid"));

      const getPost = () => {
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
            const post_temp = CleanPostResponse(res.data.data)
            setPost(post_temp);
            if (post_temp) {
              if (post_temp.hearts.length !== 0) {
                post_temp.hearts.map((user) => {
                  if (user.id.toString() === cookieCutter.get("uid")) {
                    setLoved(true);
                  }
                });
              }
            }
            setLoading(false);
          })
          .catch((err) => console.log(err));
      };
      getPost();
      

      socket.on("comment:create", () => {
        getPost();
      });
      socket.on("likesUpdated", () => {
        getPost();
      });
    }
    return () => {
      socket.removeAllListeners();
    };
  }, [router, socket]);

  const handleComment = async (e: any) => {
    e.preventDefault();
    if (comment.current) {
      if (comment.current.value !== "") {
        try {
          await Axios(jwt).post(`${process.env.STRAPI_URL}/api/comments`, {
            data: {
              post: post?.id.toString(),
              body: comment.current.value,
            },
          });
          setAlert({
            type: "success",
            body: "Comment added Successfully",
          });
          setInterval(() => {
            setAlert(undefined);
          }, 3000);
          comment.current.value = "";
        } catch (error) {
          setAlert({
            type: "Error",
            body: "Could not add comment. Please Retry!",
          });
          setInterval(() => {
            setAlert(undefined);
          }, 3000);
        }
      }
    }
  };

  const handleLove = async (e: any) => {
    e.preventDefault();
    setLoved(!loved);
    let yourLikedPosts: number[] = [];
    try {
      const res = await Axios(jwt).get(
        `${process.env.STRAPI_URL}/api/users/${uid}`,
        {
          params: {
            populate: ["likedPosts"],
          },
        }
      );
      yourLikedPosts = res.data.likedPosts.map((post: any) => post.id);
    } catch (err) {
      console.log(err);
    }

    const updatedLikedPosts: number[] = [];
    if (loved) {
      yourLikedPosts.map((id) => {
        if (id !== post?.id) {
          updatedLikedPosts.push(id);
        }
      });
    } else {
      post
        ? updatedLikedPosts.push(...yourLikedPosts, post.id)
        : updatedLikedPosts.push(...yourLikedPosts);
    }

    try {
      Axios(jwt).put(`${process.env.STRAPI_URL}/api/users/${uid}`, {
        likedPosts: updatedLikedPosts,
      });
      socket.emit("updateLikes", "likesUpdated");
    } catch (err) {
      console.log(err);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.SITE_URL}/post/${post?.id}`);
    setAlert({
      type: "success",
      body: "Post Link Copied to Clipboard",
    });
    setInterval(() => {
      setAlert(undefined);
    }, 3000);
  };

  const handleDelete = () => {
    Axios(jwt)
      .delete(`${process.env.STRAPI_URL}/api/posts/${post?.id}`)
      .then((res) => {
        setAlert({
          type: "success",
          body: "Post Deleted Successfully",
        });
        setInterval(() => {
          setAlert(undefined);
        }, 3000);
      })
      .catch((err) => {
        setAlert({
          type: "error",
          body: "Could not Delete the Post",
        });
        setInterval(() => {
          setAlert(undefined);
        }, 3000);
      });
    setDeleteBoxVisibility(false);
    setPostActionOpened(false)
  };

  if (loading) {
    return <SinglePostLoader />;
  }

  return (
    <Layout>
      {post && (
        <div className="md:h-[80vh] flex flex-col md:flex-row bg-white m-5 space-x-5 relative">
          <Head>
            <title>Post-{post.author.username}</title>
            <meta name="description" content="Developed by Ashish" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="overflow-hidden h-[400px] md:h-full w-full md:w-1/2 bg-black">
            {isDeleteBoxVisible && (
              <div className="absolute bg-gray-200 bg-opacity-50 h-full w-full flex items-center justify-center z-[20]">
                <div className="bg-white p-5 flex flex-col space-y-5">
                  <p> Are you sure you want to delete this post</p>
                  <div className="space-x-3 self-end">
                    <button
                      className="bg-red-400 px-3 py-2 cursor-pointer"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-200 px-3 py-2 cursor-pointer"
                      onClick={() => {
                        setDeleteBoxVisibility(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
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
          <div className="flex-grow relative flex flex-col">
            {showHearts && (
              <HeartCard
                showHeartCard={setShowHearts}
                uid={uid}
                hearts={post.hearts}
              />
            )}
            <div className="p-5 space-y-5">
              <div className="flex items-center space-x-5 flex-grow p-3 border-b">
                <UserAvatar src={post.author.profilepic.url} />
                <div className="flex-grow">
                  <Link
                    as={`/profile/${post.author.id}`}
                    href={`/profile/${post.author.id}`}
                    className="font-bold hover:underline"
                  >
                    {post.author.username}
                  </Link>
                </div>

                <div>
                  <FiMoreHorizontal
                    className="cursor-pointer"
                    onClick={() => {
                      setPostActionOpened(!postActionOpened);
                    }}
                  />
                  {postActionOpened && (
                    <div className="absolute bg-gray-100 right-5 p-3 flex flex-col justify-start space-y-3 text-gray-600">
                      {parseInt(uid) === post.author.id && (
                        <button
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => {
                            setDeleteBoxVisibility(true);
                          }}
                        >
                          <AiFillDelete />
                          <p>Delete</p>
                        </button>
                      )}
                      <button
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={copyLink}
                      >
                        <AiFillCopy />
                        <p>Copy Link</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 flex items-center space-x-3">
                <div className="h-[40px] w-[40px]">
                <Image
                  className="rounded-full w-full h-full object-cover"
                  width={40}
                  height={40}
                  alt={`${post.author.username}-profilepic`}
                  src={post.author.profilepic.url}
                />
                </div>
                <div>
                  <span className="font-semibold pr-3 text-blue-500">
                    {post.author.username}
                  </span>
                  {post.caption && <span>{post.caption}</span>}
                  <p className="text-gray-400 text-sm">
                    {GetTimeDifference(post.postedAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-grow overflow-y-scroll pb-10 scrollbar-none h-[300px] md:h-auto">
              {post.comments.length !== 0 ? (
                post.comments.map((cmnt, index) => (
                  <Comment key={index} cmnt={cmnt} />
                ))
              ) : (
                <div className="text-center p-20 text-gray-300 w-full">
                  No comments
                </div>
              )}
            </div>
            <div className="flex items-center p-5">
              <div className="postcard-icon-container" onClick={handleLove}>
                {loved ? (
                  <AiFillHeart className="postcard-icon text-red-500" />
                ) : (
                  <AiOutlineHeart className="postcard-icon" />
                )}
              </div>
              {post.heartcount > 0 && (
                <div
                  className="px-5 cursor-pointer hover:underline"
                  onClick={() => {
                    setShowHearts(true);
                  }}
                >
                  {`Loved by ${
                    loved ? (post.hearts.length > 1 ? "you," : "you") : ""
                  } ${
                    post.hearts[0].id.toString() === uid
                      ? post.hearts.length > 1
                        ? post.hearts[1].username
                        : ""
                      : post.hearts[0].username
                  } ${
                    loved
                      ? post.hearts.length > 2
                        ? `and ${
                            post.hearts.length - 2 === 1
                              ? "1 other"
                              : `${post.hearts.length - 2} others`
                          }`
                        : ""
                      : post.hearts.length > 1
                      ? `and ${
                          post.hearts.length - 1 == 1
                            ? "1 other"
                            : `${post.hearts.length - 1} others`
                        }`
                      : ""
                  }`}
                </div>
              )}
            </div>
            <form className="p-5 flex items-center px-3 border-t bg-white">
              <input
                ref={comment}
                className="bg-transparent flex-grow outline-none"
                type="text"
                placeholder="Write a Comment"
              />
              <button onClick={handleComment} className="hidden"></button>
              <AiOutlineSend
                className="text-2xl text-blue-400"
                onClick={handleComment}
              />
            </form>
            {alert && <GlobalAlert type={alert.type} body={alert.body} />}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SinglePost;
