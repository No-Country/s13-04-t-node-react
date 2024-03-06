import { HeaderUser } from "../../components/shared/HeaderUser";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/auth";
import ModalConfirmReservation from "../../components/parkingReservation/ModalConfirmReservation";
import ModalCancelReservation from "../../components/parkingReservation/ModalcancelReservation";
import BackButton from "../../components/utilities/Backbutton";
import useSWR from "swr";
import { bookingsService } from "../../services/bookings";
import { LoadingIcon } from "../../components/shared/LoadingIcon";

export const PendingParkingReservation = () => {
  const user = useCurrentUser();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: pendingBookings, isValidating } = useSWR(["pending-bookins"], () =>
    bookingsService.PendingList(user.id)
  );

  const handleRejectReservation = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
    
  };

  const handleAcceptReservation = (booking) => {
    setSelectedBooking(booking);
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
        <BackButton to="/lista-menu-reservas " />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">
            RESERVAS PENDIENTES
          </h1>
          <p>Acepta tus reservas pendientes</p>
        </div>

        {isValidating ? 
          <LoadingIcon width={36} />
        :
          <div>
            {pendingBookings?.bookings.map((booking: any) => (
              <ParkingReservatiosCard
                key={booking.id}
                showDate={false}
                showChat={false}
                showImgUser={false}
                onReject={() => handleRejectReservation(booking)}
                isLink={true}
                id={booking.id}
                patente={booking?.car.plate}
                modelo={booking?.car.model}
                marca={booking?.car.brand}
                userName={booking.car?.user.name}
                ranking={
                  booking.car?.user.rating ? booking.car?.user.rating : null
                }
                garageName={booking.garage.name}
                onAccept={() => handleAcceptReservation(booking)}
              />
            ))}
            {pendingBookings?.bookings.length === 0 && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1">
                <img src="/images/noPending.svg" alt="no pending bookings" />
                <span>No tienes ninguna reserva pendiente</span>
              </div>
            )}
          </div>
        }
      </div>
      <ModalConfirmReservation
        bookingData={selectedBooking}
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        userName="Nombre Usuario"
        date="19 de febrero"
        time="17:00"
      />
      <ModalCancelReservation
        bookingData={selectedBooking}
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        userName="Nombre Usuario"
        date="19 de febrero"
        time="17:00"
      />
    </>
  );
};
