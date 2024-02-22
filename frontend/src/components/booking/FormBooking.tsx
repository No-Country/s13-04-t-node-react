import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { garageService } from "../../services/garage";
import { IGarage } from "../../types/garage";
import Carousel from "./Carousel";
// import { useCurrentUser } from "../../hooks/auth";
import Header from "./Header";
import Schedule from "./Schedule";
import { schedule } from "./MockSchedule";

// id1 ='8b0cec74-6355-4949-ac20-70b06df8313e'
// id2 ='b7b7d344-fca3-4fae-a049-a914cf37fd67'

export const FormBooking = () => {
  const { idGaraje } = useParams();
  // datos del usuario logueado
  // const user = useCurrentUser();
  //datos del garaje a reservar
  const [garaje, setGaraje] = useState<IGarage | undefined>()


  useEffect(() => {
    if (idGaraje) {
      garageService.getById(idGaraje)
        .then(res => {
          setGaraje(res)
          console.log(res)
        })
    }
  }, [idGaraje])


  return (
    <div className="px-4 py-8 h-screen flex flex-col gap-6">
      {/* Carrusel de imagenes */}
      <Carousel
        images={[
          "https://tse4.mm.bing.net/th?id=OIP.wkFW3sPbRMmNXoKnAKyelwHaFj&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.CTTp75yu1mTgpRxM4sGK5gHaFj&pid=Api&P=0&h=180",
          "https://tse1.mm.bing.net/th?id=OIP.8HjWX5curav0AmsxCvY-pwAAAA&pid=Api&P=0&h=180"
        ]}
      />
      {/* encabezado */}
      {garaje && <Header name={garaje.name} address={garaje.address} price={garaje.price} />}
      {/* horairos */}
      <Schedule schedule={schedule} />
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