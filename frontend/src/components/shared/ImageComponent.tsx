import { Image } from '../../types/garage';

interface ImageComponentProps {
  images: Image[];
  style?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ images, style }) => {
  const imageUrl = images?.length > 0 ? images[0].route : '/images/image.png';

  return (
    <img
      src={imageUrl}
      alt='Imagen del garaje'
      className={` ${style || 'rounded-md w-full object-cover'}`}
    />
  );
};

export default ImageComponent;
