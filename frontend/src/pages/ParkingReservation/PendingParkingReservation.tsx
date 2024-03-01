import { HeaderUser } from "../../components/shared/HeaderUser";
import { BackArrowIcon } from "../../components/shared/BackArrowIcon";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { useState } from "react";
import ModalConfirmReservation from "../../components/parkingReservation/ModalConfirmReservation";
import ModalCancelReservation from "../../components/parkingReservation/ModalcancelReservation";

export const PendingParkingReservation = () => {
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
      <div className="p-4">
        <BackArrowIcon />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">
            RESERVAS PENDIENTES
          </h1>
          <p>Acepta tus reservas pendientes</p>
        </div>

        <ParkingReservatiosCard
          showDate={false}
          showChat={false}
          showImgUser={false}
          onAccept={handleAcceptReservation}
          onReject={handleRejectReservation}
          isLink={true}
        />
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
