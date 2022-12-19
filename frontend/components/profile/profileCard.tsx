import Image from "next/image";
import { userAgent } from "next/server";
import { User } from "../../typedeclaration";
const ProfileCard = ({user}:{user:User}) => {
  const Base_URL = "http://localhost:1337";
  return (
    <div className="flex items-center md:space-x-10 space-x-5 justify-center mt-10">
      <Image
        className="rounded-full"
        alt="profile-pic"
        width={150}
        height={150}
        src={`${Base_URL + user.profilepic.url}`}
      />
      <div className="space-y-5 bg-white p-5 md:p-10 rounded-md">
        <p className="text-xl font-bold text-gray-700">{user.name}</p>
        <div className="flex space-x-5  text-gray-600">
          <div className="text-center">
            <strong>{user.followersCount}</strong>
            <p>Followers</p>
          </div>
          <div className="text-center">
            <strong>{user.followingCount}</strong>
            <p>Followings</p>
          </div>
          <div className="text-center">
            <strong>{user.posts}</strong>
            <p>Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
