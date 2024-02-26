import Slider from "react-slick";
import { FaHeart } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";


interface CarouselProps {
  images: string[];
}


const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const changeFavorites = () => {

    //el favorito tiene que venir desde los datos del usuario
    setFavorite(!favorite)
    //agregar el garaje a favoritos
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image}
            alt={`Imagen de un garaje ${index + 1}`}
            className="h-auto max-h-56 w-full rounded-md"
          />
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={changeFavorites}
          >
            <FaHeart color={favorite ? 'red' : 'gray'} />
          </button>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
