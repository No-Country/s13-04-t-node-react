import React, { MouseEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  date: string;
  time: string;
}

const ModalCancelReservation: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  userName,
  date,
  time,
}) => {
  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
          Estas a un paso de rechazar la reserva de "{userName}".
          <br />
          Para el {date} a las {time} hs
        </span>
        <div className="flex justify-end">
         
            <button
              onClick={onClose}
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
