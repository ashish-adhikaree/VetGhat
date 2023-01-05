import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import cookieCutter from "cookie-cutter";
import Axios from "../../axios";
import Image from "next/image";
import { UserDetails } from "../../typedeclaration";
import {AiOutlineLogout} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import { CleanUserDetailsResponse } from "../../helper_functions/cleanStrapiResponse";
import Router from "next/router";

const ProfileSection = () => {
  const [uid, setuid] = useState();
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const isFirstLoad = useRef(true);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  useEffect(() => {
    if (isFirstLoad.current) {
      const uid = cookieCutter.get("uid");
      const jwt = cookieCutter.get("jwt");
      setuid(uid);

      Axios(jwt)
        .get(`${process.env.STRAPI_URL}/api/users/me`, {
          params: {
            populate: ["profilepic"],
          },
        })
        .then((res) => {
          setUserDetails(CleanUserDetailsResponse(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isFirstLoad.current = false;
    };
  }, []);

  const handleClick = () => {
    setDropdownVisibility(!isDropdownVisible);
  };

  const handleLogout = () => {
    Cookie.remove("jwt")
    Router.replace("/")
  }

  return (
    <div>
      {userDetails && (
        <div className="h-[40px] w-[40px]">
        <Image
          className="rounded-full cursor-pointer relative w-full h-full object-cover"
          alt={`${userDetails.username}'s profilepic`}
          src={userDetails.profilepic.url}
          height={35}
          width={35}
          onClick={handleClick}
        />
        </div>
      )}
      {isDropdownVisible && (
        <div className="absolute right-5 bg-gray-200 m-3 p-5 font-semibold text-gray-500 space-y-3">
          <Link className="flex items-center space-x-3" as={`/profile/${uid}`} href={`/profile/${uid}`}>
            <CgProfile className="text-xl"/>
            <p className="hover:underline">Visit Profile</p>
          </Link>
          <button className="flex items-center space-x-3" onClick={handleLogout}>
            <AiOutlineLogout className="text-xl"/>
            <p className="hover:underline">Sign Out</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
