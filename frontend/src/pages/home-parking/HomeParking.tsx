import { useState } from "react";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { useCurrentUser } from "../../hooks/auth";
import ModalConfirmReservation from "../../components/parkingReservation/ModalConfirmReservation";
import ModalCancelReservation from "../../components/parkingReservation/ModalcancelReservation";

export const HomeParking = () => {
  const user = useCurrentUser();
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
      <div className="p-4 pb-0">
        <h1 className="uppercase text-2xl pb-8">¡HOLA, {user.name}!</h1>
        <span className=" font-semibold">Reservas pendientes</span>
      </div>      
      <ParkingReservatiosCard
        showDate={false}
        showChat={false}
        showImgUser={false}
        onAccept={handleAcceptReservation}
        onReject={handleRejectReservation}
        isLink={true}
        
      />
      <div className="p-4">
        <div className=" mt-4">
          <span className="font-semibold ">Tus estadísticas semanales</span>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div className="text-center ">
            <div className="flex items-center justify-center bg-[#5D2B2C] text-white rounded-md text-center px-6 py-4 text-lg">
              <span>4,5</span>
            </div>
            <span>Puntos</span>
          </div>
          <div className="text-center ">
            <div className="flex items-center justify-center bg-[#D58418] rounded-md text-center px-4 py-3 text-lg">
              <img src="/images/arrowUpFit.svg" alt="arrow up" />
            </div>
            <span>ingresos</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center bg-[#D58418] font-semibold rounded-md text-center px-6 py-4 text-lg ">
              <span>$ 10540</span>
            </div>
            <span>Ingreso semanal</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <div className="text-center">
            <div className="flex items-center justify-center bg-[#5D2B2C] text-white rounded-md text-center px-6 py-4 text-lg">
              <span>15</span>
            </div>
            <span>Nuevos conductores</span>
          </div>
          <div className="text-center ">
            <div className="flex items-center justify-center bg-[#5D2B2C] text-white rounded-md text-center px-6 py-4 text-lg">
              <span>10</span>
            </div>
            <span>Nuevos conductores</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className=" font-semibold">Ganancias del mes</h2>
        <h2 className="mt-2 text-lg">Febrero 2024</h2>
        <img
          src="/images/barGraph.svg"
          alt="estadisticas"
          className="mt-4 w-full h-177"
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
