import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { ProfilePost } from "../../typedeclaration";

const PostCardProfile = ({post}:{post:ProfilePost}) => {
  const Base_URL = "http://localhost:1337"
  return (
    <div className="group h-[275px] w-[250px] cursor-pointer relative rounded-md overflow-hidden m-5">
      <div className="hidden group-hover:flex items-center justify-center space-x-3 font-semibold absolute group-hover:bg-[rgba(0,0,0,.1)] h-full w-full text-white text-xl">
        <div>
          <AiFillHeart />
          <span>{post.heartcount}</span>
        </div>
        <div>
          <BiComment />
          <span>{post.commentcount}</span>
        </div>
      </div>
      <Image
        className="h-full w-full object-cover"
        alt="post-image"
        height={200}
        width={200}
        src= {`${Base_URL + post.thumbnail.url}`}
      />
    </div>
  );
};
export default PostCardProfile;
