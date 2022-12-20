import React from 'react';
import { useState } from 'react';
import type{ImageType} from '../../typedeclaration'
import Image from 'next/image'
import {AiFillLeftSquare, AiFillRightSquare} from 'react-icons/ai'

const ImageCarousel = ({images}:{images: ImageType[]}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="relative col-span-7 overflow-hidden h-[300px] w-full">
      <button className="absolute top-1/2 left-3 text-white text-2xl" onClick={handlePrevClick}><AiFillLeftSquare/></button>
      
      <div className='h-full w-full'>
        <Image
          draggable="false"
          className="h-full w-full object-cover rounded-md"
          alt="post-image"
          src={process.env.STRAPI_URL + images[currentImageIndex].url}
          width={400}
          height={400}
          priority = {true}
        />
      </div>
      <button className="absolute top-1/2 right-3 text-white text-2xl" onClick={handleNextClick}><AiFillRightSquare/></button>
    </div>
  );
};

export default ImageCarousel;