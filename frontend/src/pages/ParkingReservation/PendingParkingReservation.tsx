import { HeaderUser } from "../../components/shared/HeaderUser";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/auth";
import ModalConfirmReservation from "../../components/parkingReservation/ModalConfirmReservation";
import ModalCancelReservation from "../../components/parkingReservation/ModalcancelReservation";
import BackButton from "../../components/utilities/Backbutton";
import useSWR from "swr";
import { bookingsService } from "../../services/bookings";
import { LoadingIcon } from "../../components/shared/LoadingIcon";
import { IBooking, IGarage } from "../../types/bookings";
import { garageService } from "../../services/garage";

export const PendingParkingReservation = () => {
  const user = useCurrentUser();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>(undefined);
  const [pendingBookings, setPendingBookings] = useState<
    IBooking[] | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [gargageSelected, setGarageSelected] = useState<string>("");

  const { data: garageList } = useSWR(["garage-list"], () =>
    garageService.getByUserId(user.id)
  );

  useEffect(() => {
    const fetchPendingBookings = async () => {
      setLoading(true);
      const data = await bookingsService.PendingList(user.id);
      setPendingBookings(data.bookings);
      setLoading(false);
    };

    const fetchPendingBookingsByGarage = async (id: string) => {
      setLoading(true);
      const data = await bookingsService.PendingListByGarage(id);
      setPendingBookings(data.bookings);
      setLoading(false);
    };

    if (gargageSelected !== "") {
      fetchPendingBookingsByGarage(gargageSelected);
    } else {
      fetchPendingBookings();
    }
  }, [gargageSelected, user.id]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setGarageSelected(e.target.value);
  };

  const handleRejectReservation = (booking: IBooking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleAcceptReservation = (booking: IBooking) => {
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

        <form>
          <select
            onChange={handleSelect}
            className="border border-black rounded-lg"
          >
            <option key={1} value="">
              Selecciona un establecimiento
            </option>
            {garageList?.data.garages.map((garage: IGarage) => (
              <option key={garage.id} value={garage.id}>
                {garage.name}
              </option>
            ))}
          </select>
        </form>

        {loading ? (
          <LoadingIcon width={36} />
        ) : (
          <div>
            {pendingBookings?.map((booking: IBooking) => (
              <ParkingReservatiosCard
                key={booking.id}
                showDate={false}
                showChat={false}
                showImgUser={false}
                linkTo={{
                  pathname: "/gestionarParking/reserva",
                  state: { booking },
                }}
                onReject={() => handleRejectReservation(booking)}
                isLink={true}
                id={booking.id}
                patente={booking?.car.plate}
                modelo={booking?.car.model}
                marca={booking?.car.brand}
                userName={booking.car?.user.name}
                ranking={
                  booking.car?.user.rating ? booking.car?.user.rating : undefined
                }
                garageName={booking.garage.name}
                onAccept={() => handleAcceptReservation(booking)}
              />
            ))}
            {pendingBookings?.length === 0 && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1 mt-4">
                <img src="/images/noPending.svg" alt="no pending bookings" />
                <span>No tienes ninguna reserva pendiente</span>
              </div>
            )}
          </div>
        )}
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
