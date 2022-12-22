import UserAvatar from "../reusables/userAvatar";
import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineSend, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Post } from "../../typedeclaration";
import { GetTimeDifference } from "../../helper_functions/getTimeDifference";
import ImageCarousel from "./imageCarousel";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import cookieCutter from "cookie-cutter";
import Axios from "../../axios";
const PostCard = ({ post }: { post: Post }) => {
  const comment = useRef<HTMLInputElement>(null);
  const [jwt, setjwt] = useState("");
  useEffect(() => {
    const jwt = cookieCutter.get("jwt");
    setjwt(jwt);
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
            if (comment.current?.value){
              comment.current.value = ''
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <div className="bg-white w-full space-y-3">
      <div className="flex items-center space-x-5 p-5">
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
          <AiOutlineHeart className="postcard-icon" />
        </div>
        <div className="postcard-icon-container">
          <BiComment className="postcard-icon" />
        </div>
        <div className="postcard-icon-container">
          <RiShareForwardLine className="postcard-icon" />
        </div>
      </div>
      {post.heartcount > 0 && (
        <div className="px-5">
          {" "}
          Loved by you and {post.heartcount - 1} others
        </div>
      )}
      {post.caption && (
        <div className="px-5 space-x-3 w-full truncate">
          <span className="font-bold">{post.author.username}</span>
          <span>{post.caption}</span>
        </div>
      )}
      {post.commentcount > 0 && (
        <div className="px-5 text-gray-400">
          {" "}
          View all {post.commentcount} comments
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
