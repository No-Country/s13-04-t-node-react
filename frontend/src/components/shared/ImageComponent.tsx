import { Image } from '../../types/garage';

interface ImageComponentProps {
  images: Image[];
  style?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ images, style }) => {
  const imageUrl = images.length > 0 ? images[0].route : '/images/Image.png';

  return (
    <img
      src={imageUrl}
      alt='Imagen del garaje'
      className={`rounded-md w-full object-cover ${style || ''}`}
    />
  );
};

export default ImageComponent;
