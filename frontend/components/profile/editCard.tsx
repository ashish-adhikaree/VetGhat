import { Blob } from "buffer";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Axios from "../../axios";

const EditProfileCard = ({ user, setEditingInProgress, jwt, socket }: any) => {
  const username = useRef<any>();
  const bio = useRef<any>();
  const [src, setSRC] = useState<string>(
    `${process.env.STRAPI_URL + user.profilepic.url}`
  );
  const [imageData, setImageData] = useState<any>();

  const handleUpdate = async() => {
    let data: any;
    data = {
      username: username.current.value,
      bio: bio.current.value,
    };
    console.log(data);
    if (imageData) {
      await Axios(jwt)
        .post(`${process.env.STRAPI_URL}/api/upload`, imageData)
        .then((res) => {
          console.log(res);
          data = {
            username: username.current.value,
            bio: bio.current.value,
            profilepic: res.data[0].id,
          };
        })
        .catch((err) => console.log(err));
    }
    Axios(jwt)
      .put(`${process.env.STRAPI_URL}/api/users/${user.id}`, data)
      .then((res) => {
        socket.emit("updateuser", "user updated");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditingInProgress(false);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const form = new FormData();
      form.append("files", e.target.files[0]);
      setImageData(form);
      setSRC(URL.createObjectURL(e.target.files[0]));
    }
    console.log(e);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center w-full h-full z-[100] top-0 right-0 bottom-0 left-0 fixed">
      <div className="flex flex-col space-y-5 bg-white items-center py-5 px-20">
        <p className="font-bold text-xl text-gray-600">Edit Profile</p>
        <div className="group relative flex items-center justify-center overflow-hidden rounded-full">
          <Image
            className="rounded-full h-40 w-40"
            alt="profile-pic"
            width={150}
            height={150}
            src={src}
            priority={true}
          />
          <div className="cursor-pointer absolute top-0 bottom-0 right-0 left-0 hidden hover:bg-gray-300 hover:bg-opacity-50 group-hover:flex items-center justify-center">
            <FaCamera className="text-4xl text-gray-600" />
            <input
              onChange={handleImageUpload}
              name="files"
              className="cursor-pointer opacity-0 absolute"
              type="file"
            />
          </div>
        </div>
        <div className="space-x-3">
          <span>Username</span>
          <input
            ref={username}
            className="border border-gray-800 outline-none"
            type="text"
            defaultValue={user.username}
          />
        </div>
        <div className="space-x-3">
          <span>Bio</span>
          <input
            ref={bio}
            className="border border-gray-800 outline-none"
            type="text"
            defaultValue={user.bio}
          />
        </div>

        <div className="space-x-3">
          <button
            className="bg-green-500 px-3 py-2 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-gray-200 px-3 py-2"
            onClick={() => {
              setEditingInProgress(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;
