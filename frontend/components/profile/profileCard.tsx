import Image from "next/image";
import { useEffect, useState } from "react";
import { UserDetails } from "../../typedeclaration";
import Axios from "../../axios";
import { Socket } from "socket.io-client";
import UserList from "./userList";
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";
import EditProfileCard from "./editCard";
import { loaderProp } from "../../reusables";

const ProfileCard = ({
  user,
  isUser,
  socket,
}: {
  user: UserDetails;
  isUser: boolean;
  socket: Socket;
}) => {
  const [hasFollowed, setHasFollowed] = useState<boolean>(false);
  const [uid, setUID] = useState<string>("");
  const [followersCardState, setFollowersCardState] = useState<boolean>(false);
  const [followingsCardState, setFollowingsCardState] =
    useState<boolean>(false);
  const router = useRouter();
  const [editingInProgress, setEditingInProgress] = useState<boolean>(false);

  const switchCardState = (type: string) => {
    if (type.toLowerCase() === "followers") {
      setFollowersCardState(!followersCardState);
    } else if (type.toLowerCase() === "followings") {
      setFollowingsCardState(!followingsCardState);
    }
  };

  const handleFollow = async (e: any) => {
    e.preventDefault();
    setHasFollowed(!hasFollowed);
    let yourFollowings: number[] = [];

    await Axios()
      .get(`${process.env.STRAPI_URL}/api/users/${uid}`, {
        params: {
          populate: ["followings"],
        },
      })
      .then((res) => {
        yourFollowings = res.data.followings.map((user: any) => user.id);
      })
      .catch((err) => console.log(err));

    const updatedFollowings: number[] = [];
    if (hasFollowed) {
      yourFollowings.map((id) => {
        if (id !== user.id) {
          updatedFollowings.push(id);
        }
      });
    } else {
      updatedFollowings.push(...yourFollowings, user.id);
    }

    Axios()
      .put(`${process.env.STRAPI_URL}/api/users/${uid}`, {
        followings: updatedFollowings,
      })
      .then((res) => {
        socket.emit("updateuser", "user updated");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setHasFollowed(false);
    const userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage === null) {
      router.push("/");
    } else {
      const temp = JSON.parse(userInLocalStorage);
      setUID(temp.id);
      if (user.followers) {
        user.followers.map((user) => {
          if (user.id.toString() === temp.id.toString()) {
            setHasFollowed(true);
          }
        });
      }
    }
  }, [user, router]);

  return (
    <div className="flex items-center mt-10">
      {editingInProgress && (
        <EditProfileCard
          user={user}
          setEditingInProgress={setEditingInProgress}
          socket={socket}
        />
      )}
      {followersCardState && (
        <UserList
          switchCardState={setFollowersCardState}
          type="followers"
          users={user.followers}
        />
      )}
      {followingsCardState && (
        <UserList
          switchCardState={setFollowingsCardState}
          type="followings"
          users={user.followings}
        />
      )}
      <div className="h-[150px] w-[150px] mr-5">
        <Image
          className="rounded-full w-full h-full object-cover"
          alt="profile-pic"
          width={150}
          height={150}
          loader={loaderProp}
          src={user.profilepic.url}
          priority={true}
        />
      </div>
      <div className="space-y-5 bg-white p-5 md:p-10 rounded-md">
        <div className="flex items-center space-x-5">
          <div className="text-xl font-bold text-gray-700">{user.username}</div>
          {isUser && (
            <button
              onClick={() => {
                setEditingInProgress(true);
              }}
            >
              <BiEdit className="text-2xl text-gray-500" />
            </button>
          )}
          <div className="w-[100px]">
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
          <div
            className="text-center cursor-pointer"
            onClick={() => {
              switchCardState("followers");
            }}
          >
            <strong>{user.followersCount}</strong>
            <p>Followers</p>
          </div>
          <div
            className="text-center cursor-pointer"
            onClick={() => {
              switchCardState("followings");
            }}
          >
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
