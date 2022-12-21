import UserAvatar from "../reusables/userAvatar";
import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineSend, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Post } from "../../typedeclaration";
import { GetTimeDifference } from "../../helper_functions/getTimeDifference";
import ImageCarousel from "./imageCarousel";
import Link from "next/link";
const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white w-full p-3 rounded-md space-y-5">
      <div className="flex items-center space-x-5">
        <UserAvatar src={post.author.profilepic.url} />
        <div className="">
          <Link
            href={`/profile/${post.author.id}`}
            className="font-bold hover:underline"
          >
            {post.author.username}
          </Link>
          <p className="text-gray-400">{GetTimeDifference(post.postedAt)}</p>
        </div>
      </div>
      {post.caption && <div className="">{post.caption}</div>}
      {post.content.length > 1 ? (
        <Link
          as={`/post/${post.id}`}
          href={`/post/${post.id}`}
          className="h-[300px]"
        >
          <ImageCarousel link={`/post/${post.id}`} images={post.content} />
        </Link>
      ) : (
        <Link as={`/post/${post.id}`} href={`/post/${post.id}`}>
          <div className="overflow-hidden h-[300px] w-full pt-5">
            <Image
              draggable="false"
              className="h-full w-full object-cover  rounded-md"
              alt="post-image"
              src={process.env.STRAPI_URL + post.content[0].url}
              width={400}
              height={400}
              priority={true}
            />
          </div>
        </Link>
      )}
      <div className="h-10 flex items-center justify-between border-y">
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
      <form className="bg-gray-50 rounded-md flex items-center px-3 h-10">
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
