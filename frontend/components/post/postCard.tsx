import UserAvatar from "../reusables/userAvatar";
import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { AiOutlineSend, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
const PostCard = ({ post, setAlert }: { post: Post; setAlert: any }) => {
  const comment = useRef<HTMLInputElement>(null);
  const [jwt, setjwt] = useState("");
  const [uid, setuid] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [loved, setLoved] = useState(false);
  const router = useRouter();
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

  const handleComment = (e: any) => {
    e.preventDefault();
    if (comment.current) {
      console.log(comment.current.value);
      if (comment.current.value !== "") {
        Axios(jwt)
          .post(`${process.env.STRAPI_URL}/api/comments`, {
            data: {
              post: post.id.toString(),
              body: comment.current.value,
            },
          })
          .then((res) => {
            setAlert({
              type: "success",
              body: "Comment added Successfully",
            });
            setInterval(() => {
              setAlert(undefined);
            }, 3000);
            if (comment.current?.value) {
              comment.current.value = "";
            }
          })
          .catch((err) => {
            setAlert({
              type: "Error",
              body: "Could not add comment. Please Retry!",
            });
            setInterval(() => {
              setAlert(undefined);
            }, 3000);
          });
      }
    }
  };
  return (
    <div className="bg-white w-full space-y-3 relative">
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
        <div className="">
          <Link
            as={`/profile/${post.author.id}`}
            href={`/profile/${post.author.id}`}
            className="font-bold hover:underline"
          >
            {post.author.username}
          </Link>
        </div>
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
      <div className="h-10 flex items-center space-x-4 px-5">
        <div className="postcard-icon-container">
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
            router.push("#comment-card-header");
          }}
          className="px-5 text-gray-400 cursor-pointer hover:underline"
        >
          View{" "}
          {post.commentcount === 1
            ? "1 comment"
            : `all ${post.commentcount} comments`}
        </div>
      )}
      <p className="text-gray-400 px-5 uppercase text-sm">
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
