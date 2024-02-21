import { Link } from "react-router-dom"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const FormBooking = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  return (
    < div className=" px-4 py-8 h-screen flex flex-col gap-6">

      {/* Carrusel de imagenes */}
      <section className="bg-gray-300 rounded-md">
        <Slider {...settings}>
          <div>
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.wkFW3sPbRMmNXoKnAKyelwHaFj&pid=Api&P=0&h=180"
              alt="Imagen de un garaje 1"
              className="h-auto max-h-56 w-full rounded-md"
            />
          </div>
          <div>
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.CTTp75yu1mTgpRxM4sGK5gHaFj&pid=Api&P=0&h=180"
              alt="Imagen de un garaje 2"
              className="h-auto max-h-56 w-full rounded-md"
            />
          </div>
        </Slider>
      </section>
      {/* encabezado */}
      <div className="grid grid-cols-4 gap-1 items-center">
        <section className="col-span-3 w-full gap-1">
          <p className="text-xl uppercase">Garaje de Juan</p>
          <p className="text-lg">Av. Directorio 3452, CABA, Argentina</p>
        </section>
        <section className="bg-[#5D2B2C] col-span-1 h-[52px] rounded-lg text-center flex items-center justify-center text-2xl text-white">4,5</section>
      </div>
      {/* precio */}
      <div className="text-center p-4 text-2xl font-medium rounded-lg text-black bg-[#D58418]">
        <span className="">$2000 x Hora </span>
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
          <img className="h-6 w-6" src="../../public/images/reserva-icon.svg" alt="reserva icon" />
          <Link to='/reservar/disponibilidad'>
            <span>Ver Disponibilidad</span>
          </Link>
        </div>
      </section>
      {/* mapa */}
      <section className="bg-[#FFE9CC] w-328 h-[72px] rounded-4 py-8 px-0 gap-x-24 grid items-center">
        <Link to='/#'>
          <div className="flex text-black">
            <img className="h-6 w-6 self-start" src="../../public/images/location.svg" alt="location icon" />
            <span className="justify-self-center">ver mapa</span>
          </div>
        </Link>
      </section>

      {/* boton */}
      <section>
        <Link
          to='/information'
          className='px-3 py-1 font-semibold rounded-lg w-full border border-black bg-white text-center'
        >
          Más información
        </Link>
      </section>
    </div>
  )
}

