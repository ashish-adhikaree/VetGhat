import UserAvatar from "../reusables/userAvatar";
import { HiOutlinePhotograph } from "react-icons/hi";
import React from "react";

const CreatePostCardMini = () => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };
  const handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center bg-white w-2/3 p-3 space-x-3 rounded-md">
      <UserAvatar src="/profile.png" />
      <form className=" text-gray-400 flex items-center justify-evenly flex-grow bg-gray-50 rounded-md">
        <button
          className="cursor-text outline-none bg-transparent p-3"
          onClick={handleClick}
        >
          K Sochdai Hunuhunxa?
        </button>
        <button onClick={handleIconClick}>
          <HiOutlinePhotograph className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default CreatePostCardMini;
