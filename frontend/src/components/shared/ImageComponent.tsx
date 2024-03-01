import React from 'react';
import { Image } from '../../types/garage';

interface ImageComponentProps {
  images: Image[];
}

const ImageComponent: React.FC<ImageComponentProps> = ({ images }) => {
  return (
    <>
      {images.length ?
        <img
          src={images[0].route}
          alt={`Image ${images[0].id}`}
          className='rounded-md w-full object-cover'
        />
        :
        <img
          src='/images/image.png'
          alt='gataje sin imagen'
          className='rounded-md w-full object-cover'
        />
      }

    </>
  );
};

export default ImageComponent;
