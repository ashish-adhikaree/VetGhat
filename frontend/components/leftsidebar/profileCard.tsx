import Link from "next/link";
import UserAvatar from "../reusables/userAvatar";
import {UserDetails } from "../../typedeclaration";

const ProfileCard = ({user}:{user:UserDetails}) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex items-center space-x-5 bg-gray-50 hover:bg-gray-100 m-5 p-4 rounded-md"
    >
      <UserAvatar src={user.profilepic.url} />
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-gray-500">{`${user.followersCount} followers`}</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
