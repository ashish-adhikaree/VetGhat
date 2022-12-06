import UserAvatar from "../reusables/userAvatar";
import Image from "next/image";
import { BiDonateHeart, BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";
const Post = () => {
  return (
    <div className="bg-white w-2/3 grid grid-rows-postcard grid-cols-5 p-3 gap-3 rounded-md">
      <UserAvatar src="/profile.png" />
      <div className="col-span-4">
        <p className="font-bold">Ashish Adhikari</p>
        <p className="text-gray-400">2 hrs</p>
      </div>
      <div className="col-span-5 overflow-hidden h-[300px] bg-black w-full">
        <Image
          draggable="false"
          className="h-full w-full object-cover"
          alt="post-image"
          src="/profile.png"
          width={400}
          height={400}
        />
      </div>
      <div className="col-span-5 flex items-center justify-between border-y">
        <div className="postcard-icon-container">
          <BiDonateHeart className="postcard-icon" />
          <span>30</span>
        </div>
        <div className="postcard-icon-container">
          <BiComment className="postcard-icon" />
          <span>12</span>
        </div>
        <div className="postcard-icon-container">
          <RiShareForwardLine className="postcard-icon" />
          <span>1</span>
        </div>
      </div>
      <form className="col-span-5 bg-gray-50 rounded-md flex items-center px-3">
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

export default Post;
