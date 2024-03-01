import { useState } from "react";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { HeaderUser } from "../../components/shared/HeaderUser";
import ModalConfirmReservation from "../../components/parkingReservation/ModalConfirmReservation";
import ModalCancelReservation from "../../components/parkingReservation/ModalcancelReservation";

export const ConfirmDeclineReservation = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleRejectReservation = () => {
    setIsCancelModalOpen(true);
  };
  const handleAcceptReservation = () => {
    setIsConfirmModalOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };
  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <HeaderUser />
      <div className="p-2">
        <div className="p-4 pb-0">
          <h1 className=" font-semibold">Confirma la reserva pendientes</h1>
        </div>
        <ParkingReservatiosCard showDate={false} />
        <div className="p-4">
          <div className=" mt-4 flex flex-col gap-3">
            <span className="font-semibold ">Datos de la reserva:</span>
            <span>Lunes 19 de febrero</span>
            <span>Inicio: 17:00 - Fin: 19:00</span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2 mt-4">
          <span>CÓDIGO DE RESERVA:</span>
          <span>2548793</span>
        </div>
        <div className="p-2 mt-3">
          <h1 className=" font-semibold text-xl">RESERVA ABONADA</h1>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleAcceptReservation}
            className="py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-8 w-full"
            style={{ height: "40px", gap: "4px" }}
          >
            Aceptar
          </button>

          <button
            onClick={handleRejectReservation}
            type="button"
            className="text-center text-black border border-[#D58418] px-16 font-normal  w-full rounded-3xl"
            style={{ height: "40px", padding: "8px 16px", gap: "4px" }}
          >
            Rechazar
          </button>
        </div>
      </div>
      <ModalConfirmReservation
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        userName="Nombre Usuario"
        date="19 de febrero"
        time="17:00"
      />
      <ModalCancelReservation
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        userName="Nombre Usuario"
        date="19 de febrero"
        time="17:00"
      />
    </>
  );
};
