import UserAvatar from "../reusables/userAvatar";
import { HiOutlinePhotograph } from "react-icons/hi";
import React from "react";

const CreatePostCardMini = ({openPostCardExtended}:{openPostCardExtended: any}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    openPostCardExtended(true);
  };
  return (
    <div className="flex items-center bg-white w-2/3 md:w-1/2 lg:w-1/3 p-3 space-x-3 rounded-md">
      <UserAvatar src="/profile.png" />
      <form className=" text-gray-400 flex items-center justify-evenly flex-grow bg-gray-50 hover:bg-gray-100 rounded-md">
        <button
          className="cursor-text outline-none bg-transparent p-3"
          onClick={handleClick}
        >
          K Sochdai Hunuhunxa?
        </button>
        <button onClick={handleClick}>
          <HiOutlinePhotograph className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default CreatePostCardMini;
