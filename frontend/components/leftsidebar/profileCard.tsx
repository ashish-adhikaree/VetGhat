import Link from "next/link";
import UserAvatar from "../reusables/userAvatar";
import { User } from "../../typedeclaration";

const ProfileCard = ({user}:{user:User}) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex space-x-5 bg-gray-50 hover:bg-gray-100 m-5 p-4 rounded-md"
    >
      <UserAvatar src={process.env.STRAPI_URL + user.profilepic.url} />
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-gray-500">{`${user.followersCount} followers`}</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
