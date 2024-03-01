import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import { HeaderUser } from "../../components/shared/HeaderUser";

export const ActParkingReservations = () => {
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

      </div>
    </>
  );
};
