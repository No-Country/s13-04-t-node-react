import { HeaderUser } from "../../components/shared/HeaderUser";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import BackButton from "../../components/utilities/Backbutton";

export const ActParkingReservations = () => {
  return (
    <>
      <HeaderUser />

      <div className="p-4">
      <BackButton to='/lista-menu-reservas ' />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">RESERVAS ACTIVAS</h1>
          <p>Consulta tus reservas activas</p>
        </div>
        <ParkingReservatiosCard
          showButtons={false}
          showModel={false}
          showImgUser={false}
        />
      </div>
    </>
  );
};
