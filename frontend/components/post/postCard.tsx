import UserAvatar from "../reusables/userAvatar";
import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineSend, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Post } from "../../typedeclaration";
import { GetTimeDifference } from "../../helper_functions/getTimeDifference";
import ImageCarousel from "./imageCarousel";
const PostCard = ({ post }: { post: Post }) => {
  const Base_URL = "http://localhost:1337";
  return (
    <div
      className={`bg-white w-2/3 md:w-1/2 lg:w-1/3 grid grid-cols-7 p-3 gap-3 rounded-md ${
        post.caption ? "grid-rows-postcardwithcaption" : "grid-rows-postcard"
      }`}
    >
      <UserAvatar src={`${Base_URL + post.author.profilepic.url}`} />
      <div className="col-span-6">
        <p className="font-bold">{post.author.name}</p>
        <p className="text-gray-400">{GetTimeDifference(post.postedAt)}</p>
      </div>
      {post.caption && <div className="col-span-7">{post.caption}</div>}
      {post.content.length > 1 ? (
        <ImageCarousel images={post.content} />
      ) : (
        <div className="col-span-7 overflow-hidden h-[300px] w-full">
          <Image
            draggable="false"
            className="h-full w-full object-cover"
            alt="post-image"
            src={`${Base_URL + post.content[0].url}`}
            width={400}
            height={400}
          />
        </div>
      )}
      <div className="col-span-7 flex items-center justify-between border-y">
        <div className="postcard-icon-container">
          <AiOutlineHeart className="postcard-icon" />
          <span>{post.heartcount}</span>
        </div>
        <div className="postcard-icon-container">
          <BiComment className="postcard-icon" />
          <span>{post.commentcount}</span>
        </div>
        <div className="postcard-icon-container">
          <RiShareForwardLine className="postcard-icon" />
          <span>{post.sharecount}</span>
        </div>
      </div>
      <form className="col-span-7 bg-gray-50 rounded-md flex items-center px-3">
        <input
          className="bg-transparent flex-grow outline-none"
          type="text"
          placeholder="Write a Comment"
        />
        <AiOutlineSend className="text-2xl text-gray-400" />
      </form>
    </div>
  );
};

export default PostCard;
