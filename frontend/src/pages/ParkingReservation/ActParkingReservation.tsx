import { HeaderUser } from "../../components/shared/HeaderUser";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import BackButton from "../../components/utilities/Backbutton";
import { useCurrentUser } from "../../hooks/auth";
import { bookingsService } from "../../services/bookings";
import useSWR from "swr";


export const ActParkingReservations = () => {
  const user = useCurrentUser();
  const { data: pendingBookings } = useSWR(["pending-bookins"], () =>
    bookingsService.PastList(user.id)
  );
  return (
    <>
      <HeaderUser />

      <div className="p-4">
      <BackButton to='/lista-menu-reservas ' />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">RESERVAS ACTIVAS</h1>
          <p>Consulta tus reservas activas</p>
        </div>
        {pendingBookings?.bookings.map((booking: any) => (
          <ParkingReservatiosCard
            key={booking.id}
            showDate={false}
            showChat={false}
            showImgUser={false}
            isLink={true}
            id={booking.id}
            patente={booking?.car.plate}
            modelo={booking?.car.model}
            marca={booking?.car.brand}
            userName={booking.car?.user.name}
            ranking={
              booking.car?.user.rating ? booking.car?.user.rating : "0,0"
            }
            garageName={booking.garage.name}
          />
        ))}
        {pendingBookings?.bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center font-semibold gap-1">
            <img src="/images/noPastBookings.svg" alt="no pending bookings" />
            <span>No tienes ninguna reserva pasada</span>
          </div>
        )}
      </div>
    </>
  );
};
