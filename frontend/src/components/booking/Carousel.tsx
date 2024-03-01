import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FavoriteHeartButton } from "../shared/FavoriteHeartButton";
import { Image } from "../../types/garage";


interface CarouselProps {
  images: Image[];
  garajeId: string
}

const Carousel: React.FC<CarouselProps> = ({ images, garajeId }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      {images.length ? images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image.route}
            alt={`Imagen de un garaje ${index + 1}`}
            className="h-auto max-h-56 w-full rounded-md"
          />
          <p className="absolute top-2 right-2 text-red-500">
            <FavoriteHeartButton id={garajeId} />
          </p>
        </div>
      )) : <div className="relative">
        <img
          src='/images/image.png'
          alt={`garaje sin foto`}
          className="h-auto max-h-56 w-full rounded-md"
        />
        <p className="absolute top-2 right-2 text-red-500">
          <FavoriteHeartButton id={garajeId} />
        </p>
      </div>}
    </Slider>
  );
};

export default Carousel;
