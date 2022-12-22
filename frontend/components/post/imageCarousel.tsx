import React from "react";
import { useState } from "react";
import type { ImageType } from "../../typedeclaration";
import Image from "next/image";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Link from "next/link";

const ImageCarousel = ({
  images,
  singlePost,
  link,
}: {
  images: ImageType[];
  singlePost?: boolean;
  link?: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
      setCurrentImageIndex(currentImageIndex + 1);
  };

  return (
    <div
      className={`relative col-span-7 overflow-hidden w-full ${
        singlePost ? "h-full" : "h-[300px]"
      }`}
    >
      {currentImageIndex !== 0 && (
        <button
          className="absolute top-1/2 left-3 text-white text-2xl"
          onClick={handlePrevClick}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      )}

      <div className="h-full w-full">
        <div className="absolute top-5 right-5 text-white text-sm bg-black bg-opacity-60 px-3 py-1 tracking-wider rounded-xl">{`${
          currentImageIndex + 1
        }/${images.length}`}</div>
        {link ? (
          <Link as={link} href={link || ""}>
            <Image
              draggable="false"
              className={`h-full w-full ${
                singlePost ? "object-contain" : "object-cover"
              }`}
              alt="post-image"
              src={process.env.STRAPI_URL + images[currentImageIndex].url}
              width={400}
              height={400}
              priority={true}
            />
          </Link>
        ) : (
          <Image
            draggable="false"
            className={`h-full w-full ${
              singlePost ? "object-contain" : "object-cover"
            }`}
            alt="post-image"
            src={process.env.STRAPI_URL + images[currentImageIndex].url}
            width={400}
            height={400}
            priority={true}
          />
        )}
      </div>
      {currentImageIndex !== images.length - 1 && (
        <button
          className="absolute top-1/2 right-3 text-2xl text-white opacity-70"
          onClick={handleNextClick}
        >
          <BsFillArrowRightCircleFill />
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
