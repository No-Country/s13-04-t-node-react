import React, { MouseEvent } from "react";
import { bookingsService } from "../../services/bookings";
import { IBooking } from "../../types/bookings";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  date: string;
  time: string;
  bookingData?: IBooking;
}

const ModalCancelReservation: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  bookingData,
}) => {
  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const sendConfirmation = async () => {
    try {
      const confirmationData = {
        idUser: bookingData?.id || '',
      };
      const resRejectBooking = await bookingsService.RejectBooking(confirmationData.idUser);
      console.log(resRejectBooking);
      onClose(); 
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  if (!isOpen) return null;
  console.log("Booking Data:", bookingData);
  // Convertir la fecha a un objeto Date
  const startDate = new Date(bookingData?.date_start || new Date());

  // Obtener los componentes de la fecha
  const day = startDate.getDate();
  const monthIndex = startDate.getMonth(); // Índice del mes (0-11)

  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();

  // Formatear la hora en formato militar
  const formattedHour = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

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
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-15 z-50"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white p-8 rounded-lg"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <span className="block text-xl font-semibold mb-4 text-red-500">
          RECHAZAR RESERVA
        </span>
        <span className="block mb-4">
          Estas a un paso de rechazar la reserva de "
          {bookingData?.car.user.name}".
          <br />
          Para el {formattedDate} a las {formattedHour} hs
        </span>

        <div className="flex justify-end">
          <button
            onClick={sendConfirmation}
            className="py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-8 w-full"
            style={{ height: "40px", gap: "4px" }}
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCancelReservation;
