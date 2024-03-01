import { HeaderUser } from "../../components/shared/HeaderUser";
import { BackArrowIcon } from "../../components/shared/BackArrowIcon";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";

export const PastParkingReservation = () => {
  return (
    <>
      <HeaderUser />
      <div className="p-4">
        <BackArrowIcon />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">RESERVAS PASADAS</h1>
          <p>Consulta tus historial de reservas</p>
        </div>

        <ParkingReservatiosCard
          showDate={false}
          showChat={false}
          showModel={false}
          showButtons={false}
          textColor="text-white"
          bgColor="bg-[#5B5751]"
          carIconSrc="/images/car-white-icon.svg"
          showImgUser={false}
        />

      </div>
    </>
  );
};
