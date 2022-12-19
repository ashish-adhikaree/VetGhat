import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

const PostCardProfile = () => {
  return (
    <div className="group h-[275px] w-[250px] cursor-pointer relative">
      <div className="hidden group-hover:flex items-center justify-center space-x-3 font-semibold absolute group-hover:bg-[rgba(0,0,0,.1)] h-full w-full text-white text-xl">
        <div>
          <AiFillHeart />
          <span>23</span>
        </div>
        <div>
          <BiComment />
          <span>12</span>
        </div>
      </div>
      <Image
        className="h-full w-full object-cover"
        alt="post-image"
        height={200}
        width={200}
        src="/profile.png"
      />
    </div>
  );
};
export default PostCardProfile;
