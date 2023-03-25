import UserAvatar from "../reusables/userAvatar";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePhotograph } from "react-icons/hi";
import React, { useState } from "react";
import { Post, PostFormData, UserDetails } from "../../typedeclaration";
import Image from "next/image";
import Axios from "../../axios";
import { CleanPostResponse } from "../../helper_functions/cleanStrapiResponse";

type PROPS = {
  closePostCardExtended: any;
  user: UserDetails;
  setAlert: any;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
};
const CreatePostCardExtended: React.FC<PROPS> = ({
  closePostCardExtended,
  user,
  setAlert,
  setPosts,
}) => {
  const [formData, setFormData] = useState<PostFormData>({
    files: [],
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (formData.files.length !== 0) {
      const data = {
        caption: formData.caption,
      };
      const form = new FormData();
      for (let i = 0; i < formData.files?.length; i++) {
        form.append("files.content", formData.files[i]);
      }
      form.append("data", JSON.stringify(data));

      Axios()
        .post(`${process.env.STRAPI_URL}/api/posts`, form, {
          params: {
            populate: [
              "author.profilepic",
              "author.posts",
              "content",
              "comments",
              "comments.author",
              "comments.author.profilepic",
              "hearts",
              "hearts.profilepic",
            ],
          },
        })
        .then((res) => {
          const temp = CleanPostResponse(res.data.data);
          setPosts((oldArray) => {
            if (oldArray) {
              return [temp, ...oldArray];
            }
            return [temp];
          });
          setAlert({
            type: "success",
            body: "Post Created Successfully",
          });
          setInterval(() => {
            setAlert(undefined);
          }, 3000);
        })
        .catch((err) => console.log(err));
      closePostCardExtended(false);
      window.onscroll = () => {};
    } else {
      setAlert({
        type: "error",
        body: "No images selected",
      });
      setInterval(() => {
        setAlert(undefined);
      }, 3000);
    }
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
          <UserAvatar src={user.profilepic.url} />
          <div>
            <p className="font-bold">{user.username}</p>
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
