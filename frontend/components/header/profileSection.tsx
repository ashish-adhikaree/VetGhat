import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User, UserDetails } from "../../typedeclaration";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { loaderProp } from "../../reusables";
import axios from "axios";

const ProfileSection: React.FC = () => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const router = useRouter();
  const handleClick = () => {
    setDropdownVisibility(!isDropdownVisible);
  };
  useEffect(() => {
    // Getting users
    const userOnLocalStorage = localStorage.getItem("user");
    if (userOnLocalStorage !== null) {
      const user = JSON.parse(userOnLocalStorage);
      setUserDetails(user);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      localStorage.removeItem('user')
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {userDetails && (
        <div className="h-[40px] w-[40px]">
          <Image
            loader={loaderProp}
            className="rounded-full cursor-pointer relative w-full h-full object-cover"
            alt={`${userDetails.username}'s profilepic`}
            src={userDetails.profilepic.url}
            height={35}
            width={35}
            onClick={handleClick}
            unoptimized
          />
        </div>
      )}
      {isDropdownVisible && (
        <div className="absolute right-5 bg-gray-200 m-3 p-5 font-semibold text-gray-500 space-y-3">
          <Link
            className="flex items-center space-x-3"
            as={`/profile/${userDetails?.id}`}
            href={`/profile/${userDetails?.id}`}
          >
            <CgProfile className="text-xl" />
            <p className="hover:underline">Visit Profile</p>
          </Link>
          <button
            className="flex items-center space-x-3"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="text-xl" />
            <p className="hover:underline">Sign Out</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
