import UserAvatar from "../reusables/userAvatar";
import Image from "next/image";
import { BiComment } from "react-icons/bi";
import {
  AiOutlineSend,
  AiOutlineHeart,
  AiFillHeart,
  AiFillDelete,
  AiFillCopy,
} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { Post } from "../../typedeclaration";
import { GetTimeDifference } from "../../helper_functions/getTimeDifference";
import ImageCarousel from "./imageCarousel";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import cookieCutter from "cookie-cutter";
import Axios from "../../axios";
import CommentCard from "./commentCard";
import HeartCard from "./heartCard";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
const PostCard = ({
  post,
  setAlert,
  socket,
}: {
  post: Post;
  setAlert: any;
  socket: Socket;
}) => {
  const comment = useRef<HTMLInputElement>(null);
  const [jwt, setjwt] = useState("");
  const [uid, setuid] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [loved, setLoved] = useState<boolean>();
  const [postActionOpened, setPostActionOpened] = useState<boolean>(false);
  const [isDeleteBoxVisible, setDeleteBoxVisibility] = useState<boolean>(false);

  useEffect(() => {
    const jwt = cookieCutter.get("jwt");
    setjwt(jwt);
    setuid(cookieCutter.get("uid"));
    if (post.hearts.length !== 0) {
      post.hearts.map((user) => {
        if (user.id.toString() === cookieCutter.get("uid")) {
          setLoved(true);
        }
      });
    }
  }, []);

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
        if (id !== post.id) {
          updatedLikedPosts.push(id);
        }
      });
    } else {
      updatedLikedPosts.push(...yourLikedPosts, post.id);
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

  const handleComment = async (e: any) => {
    e.preventDefault();
    if (comment.current) {
      if (comment.current.value !== "") {
        try {
          await Axios(jwt).post(`${process.env.STRAPI_URL}/api/comments`, {
            data: {
              post: post.id.toString(),
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

  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.SITE_URL}/post/${post.id}`);
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
      .delete(`${process.env.STRAPI_URL}/api/posts/${post.id}`)
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
  };

  return (
    <div className="bg-white w-full relative">
      {isDeleteBoxVisible && (
        <div className="absolute bg-gray-200 bg-opacity-50 h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 flex flex-col space-y-5">
            <p> Are you sure you want to delete this post</p>
            <div className="space-x-3 self-end">
              <button className="bg-red-400 px-3 py-2" onClick={handleDelete}>
                Confirm
              </button>
              <button
                className="bg-gray-200 px-3 py-2"
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
      {showComments && (
        <CommentCard
          showCommentCard={setShowComments}
          comments={post.comments}
        />
      )}
      {showHearts && (
        <HeartCard
          showHeartCard={setShowHearts}
          uid={uid}
          hearts={post.hearts}
        />
      )}
      <div className="flex items-center space-x-5 p-5">
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
        {parseInt(uid) === post.author.id && (
          <div>
            <FiMoreHorizontal
              className="cursor-pointer"
              onClick={() => {
                setPostActionOpened(!postActionOpened);
              }}
            />
            {postActionOpened && (
              <div className="absolute bg-gray-100 right-5 p-3 flex flex-col justify-start space-y-3 text-gray-600">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => {
                    setDeleteBoxVisibility(true);
                  }}
                >
                  <AiFillDelete />
                  <p>Delete</p>
                </button>
                <button
                  className="flex items-center space-x-2"
                  onClick={copyLink}
                >
                  <AiFillCopy />
                  <p>Copy Link</p>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {post.content.length > 1 ? (
        <ImageCarousel link={`/post/${post.id}`} images={post.content} />
      ) : (
        <Link as={`/post/${post.id}`} href={`/post/${post.id}`}>
          <div className="overflow-hidden h-[300px] w-full">
            <Image
              draggable="false"
              className="h-full w-full object-cover"
              alt="post-image"
              src={process.env.STRAPI_URL + post.content[0].url}
              width={400}
              height={400}
              priority={true}
            />
          </div>
        </Link>
      )}
      <div className="h-10 flex items-center space-x-4 px-5 pt-2">
        <div className="postcard-icon-container" onClick={handleLove}>
          {loved ? (
            <AiFillHeart className="postcard-icon text-red-500" />
          ) : (
            <AiOutlineHeart className="postcard-icon" />
          )}
        </div>
        <div className="postcard-icon-container">
          <BiComment className="postcard-icon" />
        </div>
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
      {post.caption && (
        <div className="px-5 space-x-3 w-full truncate">
          <span className="font-bold">{post.author.username}</span>
          <span>{post.caption}</span>
        </div>
      )}
      {post.commentcount > 0 && (
        <div
          onClick={() => {
            setShowComments(true);
          }}
          className="px-5 text-gray-400 cursor-pointer hover:underline"
        >
          View{" "}
          {post.commentcount === 1
            ? "1 comment"
            : `all ${post.commentcount} comments`}
        </div>
      )}
      <p className="text-gray-400 px-5 uppercase text-sm py-2">
        {GetTimeDifference(post.postedAt)}
      </p>
      <form className="flex items-center px-5 border-t py-5">
        <input
          ref={comment}
          className="bg-transparent flex-grow outline-none"
          type="text"
          placeholder="Write a Comment..."
        />
        <button className="hidden" onClick={handleComment}></button>
        <AiOutlineSend
          className="text-2xl text-blue-300"
          onClick={handleComment}
        />
      </form>
    </div>
  );
};

export default PostCard;
