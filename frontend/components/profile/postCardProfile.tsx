import Image from "next/image";
import { BiComment } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { ProfilePost } from "../../typedeclaration";
import Link from "next/link";
import { loaderProp } from "../../reusables";

const PostCardProfile = ({ post }: { post: ProfilePost }) => {
  return (
    <Link as={`/post/${post.id}`} href={`/post/${post.id}`} className="group h-[275px] w-[250px] cursor-pointer relative rounded-md overflow-hidden m-5">
      {post.multiImages && (
        <div className="absolute top-2 right-2 text-xl text-white">
          <RiCheckboxMultipleBlankFill />
        </div>
      )}
      <div className="hidden group-hover:flex items-center justify-center space-x-3 font-semibold absolute group-hover:bg-[rgba(0,0,0,.5)] h-full w-full text-white text-xl">
        <div className="text-center">
          <AiFillHeart />
          <span>{post.heartcount}</span>
        </div>
        <div className="text-center">
          <BiComment />
          <span>{post.commentcount}</span>
        </div>
      </div>
      <Image
        loader={loaderProp}
        className="h-full w-full object-cover"
        alt="post-image"
        height={200}
        width={200}
        src={`${process.env.STRAPI_URL  + post.thumbnail.url}`}
        priority={true}
        unoptimized
      />
    </Link>
  );
};
export default PostCardProfile;
