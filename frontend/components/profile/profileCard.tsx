import Image from "next/image";
import { useState } from "react";
import { UserDetails } from "../../typedeclaration";
const ProfileCard = ({ user, isUser }: { user: UserDetails; isUser: boolean }) => {
  const [hasFollowed, setHasFollowed] = useState<boolean>(false);
  const handleFollow = (e: any) => {
    e.preventDefault();
    setHasFollowed(!hasFollowed);
  };
  return (
    <div className="w-full md:w-[3/2] max-w-xl flex items-center md:space-x-10 space-x-5 justify-center mt-10">
      <Image
        className="rounded-full"
        alt="profile-pic"
        width={150}
        height={150}
        src={`${process.env.STRAPI_URL + user.profilepic.url}`}
        priority = {true}
      />
      <div className="space-y-5 bg-white p-5 md:p-10 rounded-md">
        <div className="flex items-center space-x-5">
          <p className="text-xl font-bold text-gray-700">{user.username}</p>
          <div className="w-[40px]">
            {!isUser && !hasFollowed && (
              <button
                className="bg-blue-400 text-white px-3 py-1 rounded-md"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
            {!isUser && hasFollowed && (
              <button
                className="bg-green-400 text-white px-3 py-1 rounded-md"
                onClick={handleFollow}
              >
                Following
              </button>
            )}
          </div>
        </div>
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
            <strong>{user.postsCount}</strong>
            <p>Posts</p>
          </div>
        </div>
        <p className="font-semibold">{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
