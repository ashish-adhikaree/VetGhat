import UserAvatar from "../reusables/userAvatar";
import { HiOutlinePhotograph } from "react-icons/hi";
import { User } from "../../typedeclaration";

const CreatePostCardMini = ({openPostCardExtended, user}:{openPostCardExtended: any, user:User}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    openPostCardExtended(true);
  };
  return (
    <div className="flex items-center bg-white w-full p-3 space-x-3 rounded-md">
      <UserAvatar src={`${process.env.STRAPI_URL + user.profilepic.url}`} />
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
