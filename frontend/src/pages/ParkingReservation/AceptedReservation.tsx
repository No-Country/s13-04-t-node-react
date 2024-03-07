import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { HeaderUser } from "../../components/shared/HeaderUser";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AceptedReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  console.log(bookingData);

  const handleClick = () => {
    navigate("/");
  };

  // Convertir la fecha a un objeto Date
  const startDate = new Date(bookingData?.date_start);
  const endDate = new Date(bookingData?.date_end);

  // Obtener los componentes de la fecha
  const day = startDate.getDate();

  const monthIndex = startDate.getMonth(); // Índice del mes (0-11)

  const hours = startDate.getHours();
  const endHours = endDate.getHours();
  const minutes = startDate.getMinutes();
  const endMinutes = endDate.getMinutes();

  // Formatear la hora en formato militar
  const formattedHour = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""
    }${minutes}`;

  const formattedEndHour = `${endHours < 10 ? "0" : ""}${endHours}:${endMinutes < 10 ? "0" : ""
    }${endMinutes}`;

  // Array de nombres de meses en español
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Obtener el nombre del mes a partir del índice
  const month = months[monthIndex];

  // Construir la cadena de fecha en el formato deseado
  const formattedDate = `${day} de ${month}`;

  return (
    <>
      <HeaderUser />
      <div className="p-2">
        <div className="p-4 pb-0">
          <h1 className=" font-semibold">Confirma la reserva pendientes</h1>
        </div>
        <ParkingReservatiosCard
          showDate={false}
          patente={bookingData?.car.plate}
          modelo={bookingData?.car.model}
          marca={bookingData?.car.brand}
          userName={bookingData.car?.user.name}
          ranking={
            bookingData.car?.user.rating ? bookingData.car?.user.rating : null
          }
          garageName={bookingData.garage.name}
        />

        <div className="p-4">
          <div className=" mt-4 flex flex-col gap-3">
            <span className="font-semibold ">Datos de la reserva:</span>
            <span>{formattedDate}</span>
            <span>
              Inicio: {formattedHour} - Fin: {formattedEndHour}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2 mt-4">
          <span>CÓDIGO DE RESERVA:</span>
          <span>2548793</span>
        </div>
        <div className="flex justify-between p-2 mt-3">
          <h1 className="font-semibold text-xl">RESERVA ABONADA</h1>
          <h1 className="font-semibold text-xl">$ {bookingData.price}</h1>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClick}
            className="py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-8 w-full"
            style={{ height: "40px", gap: "4px" }}
          >
            Volver al Home
          </button>
        </div>
      </div>
    </>
  );
};
