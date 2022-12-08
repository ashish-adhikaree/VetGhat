import UserAvatar from "../reusables/userAvatar";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePhotograph } from "react-icons/hi";

const CreatePostCardExtended = () => {
  return (
    <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-xl space-y-6">
      <div className="relative border-b text-center font-bold text-xl py-3">
        Create Post
        <button className="absolute top-4 right-5">
          <GiCancel className="text-gray-400 hover:text-gray-700 " />
        </button>
      </div>
      <div className="flex space-x-5 items-center">
        <UserAvatar src="/profile.png" />
        <div>
          <p className="font-bold">Ashish Adhikari</p>
          <select
            className="outline-none font-bold text-sm text-gray-500 bg-black bg-opacity-10 hover:shadow-sm cursor-pointer rounded-md px-3 py-1"
            name="Audience"
            id="audience"
          >
            <option value="true">&#127760; Public</option>
            <option value="false">&#128274; Only Me</option>
          </select>
        </div>
      </div>
      <div className="relative">
        <textarea
          className=" p-3 outline-none w-full resize-none"
          placeholder="Ani K Sochdai Hunuhunxa?"
        />
        <button className="absolute bottom-0 right-5 text-2xl text-gray-400">
          <HiOutlinePhotograph />
        </button>
      </div>
      <button className="bg-purple-500 w-full py-3 font-bold text-white rounded-b-xl">
        Post Now
      </button>
    </div>
  );
};

export default CreatePostCardExtended;
