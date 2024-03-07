import { useState } from "react";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { HeaderUser } from "../../components/shared/HeaderUser";
import ModalConfirmReservation from "../../components/parkingReservation/ModalConfirmReservation";
import ModalCancelReservation from "../../components/parkingReservation/ModalcancelReservation";
import BackButton from "../../components/utilities/Backbutton";
import { useLocation } from "react-router-dom";
import { IBooking } from "../../types/bookings";

export const ConfirmDeclineReservation = () => {
  const location = useLocation();
  const bookingData = location.state?.booking;
  //const { booking } = props.location.state; // Accede a los datos de la reserva

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>(undefined);

  const handleRejectReservation = (bookingData: IBooking) => {
    setSelectedBooking(bookingData);
    setIsCancelModalOpen(true);
  };

  const handleAcceptReservation = (bookingData: IBooking) => {
    setSelectedBooking(bookingData);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  // Convertir la fecha a un objeto Date
  const startDate = new Date(bookingData?.date_start);
  const endDate = new Date(bookingData?.date_end);

/*   // Obtener los componentes de la fecha
  const day = startDate.getDate();

  const monthIndex = startDate.getMonth(); // Índice del mes (0-11) */

  const hours = startDate.getHours();
  const endHours = endDate.getHours();
  const minutes = startDate.getMinutes();
  const endMinutes = endDate.getMinutes();

  // Formatear la hora en formato militar
  const formattedHour = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  const formattedEndHour = `${endHours < 10 ? "0" : ""}${endHours}:${
    endMinutes < 10 ? "0" : ""
  }${endMinutes}`;

/*   // Array de nombres de meses en español
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
  const formattedDate = `${day} de ${month}`; */

  return (
    <>
      <HeaderUser />
      <div className="mt-1">
        <BackButton to="/ " />
      </div>

      <div className="p-2">
        <div className=" pb-0">
          <h1 className=" font-semibold">Confirma la reserva pendientes</h1>
        </div>
        <ParkingReservatiosCard
          showDate={false}
          showChat={false}
          patente={bookingData?.car.plate}
          modelo={bookingData?.car.model}
          marca={bookingData?.car.brand}
          userName={bookingData?.car?.user.name}
          ranking={
            bookingData.car?.user.rating ? bookingData.car?.user.rating : null
          }
          garageName={bookingData.garage.name}
        />
        <div className="p-2">
          <div className=" mt-2 flex flex-col gap-3">
            <span className="font-semibold ">Datos de la reserva:</span>
            <span>{}</span>
            <span>
              Inicio: {formattedHour} - Fin: {formattedEndHour}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2 mt-2">
          <span>CÓDIGO DE RESERVA:</span>
          <span>{145689}</span>
        </div>
        <div className="p-2 mt-1">
          <h1 className=" font-semibold text-xl">RESERVA ABONADA</h1>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleAcceptReservation(bookingData)}
            className="py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-4 w-full"
            style={{ height: "40px", gap: "4px" }}
          >
            Aceptar
          </button>

          <button
            onClick={() => handleRejectReservation(bookingData)}
            type="button"
            className="text-center text-black border border-[#D58418] px-16 font-normal  w-full rounded-3xl"
            style={{ height: "40px", padding: "8px 16px", gap: "4px" }}
          >
            Rechazar
          </button>
        </div>
      </div>
      <ModalConfirmReservation
        bookingData={selectedBooking}
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        userName={bookingData.userName}
        date={bookingData.date}
        time={bookingData.startTime}
      />
      <ModalCancelReservation
        bookingData={selectedBooking}
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        userName={bookingData.userName}
        date={bookingData.date}
        time={bookingData.startTime}
      />
    </>
  );
};

export default ConfirmDeclineReservation;
