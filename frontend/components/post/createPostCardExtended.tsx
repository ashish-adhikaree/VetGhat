import UserAvatar from "../reusables/userAvatar";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePhotograph } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import { createClient } from "../../apolloClient";
import { createPost, uploadContent } from "../../lib/mutation";
import { PostFormData } from "../../typedeclaration";
import Image from "next/image";
import { User } from "../../typedeclaration";
import cookieCutter from "cookie-cutter";

const CreatePostCardExtended = ({
  closePostCardExtended,
  jwt,
  user,
  refreshPosts
}: {
  closePostCardExtended: any;
  jwt: string;
  user: User;
  refreshPosts: any
}) => {
  const [formData, setFormData] = useState<PostFormData>({ isPublic: true });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // const imagesToUpload = useState(new FormData())

  window.onscroll = () => {
    window.scrollTo(0, 0);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    closePostCardExtended(false);
    window.onscroll = () => {};
  };

  const handleInput = async (e: any) => {
    if (e.target.name === "files") {
      if (e.target.files[0]) {
        setSelectedImages((initialArray) => [
          ...initialArray,
          URL.createObjectURL(e.target.files[0]),
        ]);
      }
      setFormData({
        ...formData,
        files: formData.files
          ? [...formData.files, e.target.files[0]]
          : [e.target.files[0]],
      });
    } else if (e.target.name === "isPublic") {
      const temp = e.target.value === "true" ? true : false;
      setFormData({ ...formData, [e.target.name]: temp });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const client = createClient(jwt);
    client
      .mutate({
        mutation: uploadContent,
        variables: {
          files: formData.files,
        },
      })
      .then((res) => {
        console.log(res)
        client
      .mutate({
        mutation: createPost,
        variables: {
          isPublic: formData.isPublic,
          authorid: user.id,
          caption: formData.caption ? formData.caption : "",
          content: res.data.multipleUpload.map((file:any)=>file.data.id)
        },
      })
      .then((res) => {})
      .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    
    refreshPosts(client)
    closePostCardExtended(false);
    window.onscroll = () => {};
  };

  return (
    <div className="h-full w-full flex items-center justify-center fixed bottom-0 left-0 z-[200] bg-black bg-opacity-60">
      <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-xl space-y-6">
        <div className="relative border-b text-center font-bold text-xl py-3">
          Create Post
          <button onClick={handleClose} className="absolute top-4 right-5">
            <GiCancel className="text-gray-400 hover:text-gray-700 " />
          </button>
        </div>
        <div className="flex space-x-5 items-center pl-3">
          <UserAvatar src={`${process.env.STRAPI_URL + user.profilepic.url}`} />
          <div>
            <p className="font-bold">{user.username}</p>
            <select
              className="outline-none font-bold text-sm text-gray-500 bg-black bg-opacity-10 hover:shadow-sm cursor-pointer rounded-md px-3 py-1"
              name="isPublic"
              id="audience"
              onChange={handleInput}
            >
              <option value="true">&#127760; Public</option>
              <option value="false">&#128274; Only Me</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <textarea
            className=" p-3 outline-none w-full resize-none"
            placeholder="Ani K Sochdai Hunuhunxa?"
            name="caption"
            onChange={handleInput}
          />
          <div
            className={`flex align-top space-x-3 w-[92%] ${
              selectedImages.length > 2 ? "overflow-x-scroll" : "overflow-auto"
            } mx-3`}
          >
            {selectedImages &&
              selectedImages.map((src, index) => (
                <Image
                  className="self-start"
                  key={index}
                  width={150}
                  height={150}
                  alt="selected-images"
                  src={src}
                />
              ))}
          </div>
          <button className="absolute bottom-0 right-5 text-2xl text-gray-400 overflow-hidden">
            <HiOutlinePhotograph className="" />
            <input
              type="file"
              name="files"
              className="absolute top-0 right-0 w-[500px] cursor-pointer"
              onChange={handleInput}
            />
          </button>
        </div>
        <button
          className="bg-purple-500 w-full py-3 font-bold text-white rounded-b-xl"
          onClick={handleSubmit}
        >
          Post Now
        </button>
      </div>
    </div>
  );
};

export default CreatePostCardExtended;
