import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { FaHeart } from 'react-icons/fa';
import { garageService } from "../../services/garage";
import { IGarage } from "../../types/garage";
// import { useCurrentUser } from "../hooks/auth";

export const FormBooking = () => {
  //traer datos del usuario
  // const user = useCurrentUser();
  //traer los datos del garaje
  const [garaje, setGaraje] = useState<IGarage | undefined>()

  useEffect(() => {
    garageService.getById("b7b7d344-fca3-4fae-a049-a914cf37fd67")
      .then(res => { setGaraje(res) })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favorites, setFavorites] = useState<number[]>([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const addToFavorites = () => {
    //agregar el garaje a favoritos
  };


  return (
    <div className="px-4 py-8 h-screen flex flex-col gap-6">
      {/* Carrusel de imagenes */}
      <section className="bg-gray-300 rounded-md relative">
        <Slider {...settings}>
          <div className="relative">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.wkFW3sPbRMmNXoKnAKyelwHaFj&pid=Api&P=0&h=180"
              alt="Imagen de un garaje 1"
              className="h-auto max-h-56 w-full rounded-md"
            />
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => addToFavorites()}
            >
              <FaHeart color={favorites ? 'red' : 'gray'} />
            </button>
          </div>
          <div className="relative">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.CTTp75yu1mTgpRxM4sGK5gHaFj&pid=Api&P=0&h=180"
              alt="Imagen de un garaje 2"
              className="h-auto max-h-56 w-full rounded-md"
            />
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => addToFavorites()}
            >
              <FaHeart color={favorites ? 'red' : 'gray'} />
            </button>
          </div>
        </Slider>
      </section>

      {/* encabezado */}
      <div className="grid grid-cols-4 gap-1 items-center">
        <section className="col-span-3 w-full gap-1">
          <p className="text-xl uppercase">{garaje?.name} </p>
          <p className="text-lg">{garaje?.address}</p>
        </section>
        <section className="bg-[#5D2B2C] col-span-1 h-[52px] rounded-lg text-center flex items-center justify-center text-2xl text-white">
          4,5
        </section>
      </div>
      {/* precio */}
      <div className="text-center p-4 text-2xl font-medium rounded-lg text-black bg-[#D58418]">
        <span className="">${garaje?.price} x Hora </span>
      </div>
      {/* horairos */}
      <section className="w-full">
        <ul className="grid grid-cols-2 ">
          <li className="text-left">
            <strong>Lunes:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
          <li className="text-left">
            <strong>Martes:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
          <li className="text-left">
            <strong>Miércoles:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
          <li className="text-left">
            <strong>Jueves:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
          <li className="text-left">
            <strong>Viernes:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
          <li className="text-left">
            <strong>Sábado:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
          <li className="text-left">
            <strong>Domingo:</strong>
          </li>
          <li className="text-left">00:00 - 00:00</li>
        </ul>
        <div className="flex items-center py-4 text-black">
          <img
            className="h-6 w-6"
            src="/images/reserva-icon.svg"
            alt="reserva icon"
          />
          <Link to="/reservar/disponibilidad">
            <span>Ver Disponibilidad</span>
          </Link>
        </div>

      </section>
      {/* mapa */}
      <section className="bg-[#FFE9CC] w-328 h-[72px] rounded-4 py-8 px-0 gap-x-24 flex items-center justify-center">
        <Link to="/#" className="flex items-center space-x-2 text-black">
          <img
            className="h-6 w-6"
            src="/images/location.svg"
            alt="location icon"
          />
          <span className="text-lg ml-2">Ver mapa</span>
        </Link>
      </section>

      {/* boton */}
      <Link to='/#' className="text-center py-2 px-4 text-lg font-medium rounded-3xl h-10 text-black bg-[#D58418]">
        <span className="">Reservar </span>
      </Link>
    </div>
  );
};
