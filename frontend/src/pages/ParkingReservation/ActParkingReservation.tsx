import { HeaderUser } from "../../components/shared/HeaderUser";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import BackButton from "../../components/utilities/Backbutton";
import { useCurrentUser } from "../../hooks/auth";
import { bookingsService } from "../../services/bookings";
import useSWR from "swr";
import { LoadingIcon } from "../../components/shared/LoadingIcon";
import { garageService } from "../../services/garage";
import { IGarage } from "../../types/garage";
import { useState, useEffect } from "react";
import { IBooking } from "../../types/bookings";


export const ActParkingReservations = () => {
  const [activeBookings, setActiveBookings] = useState<IBooking[] | undefined>()
  const [loading, setLoading] = useState(false)
  const [gargageSelected, setGarageSelected] = useState<string>('')

  const user = useCurrentUser();

  const {data: garageList} = useSWR(['garage-list'] , () => 
  garageService.getByUserId(user.id)
  )

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation()
    setGarageSelected(e.target.value)
  }

  useEffect(() =>{
    const fetchActiveBookings = async () => {
      setLoading(true)
      const data = await bookingsService.ActiveList(user.id);
      setActiveBookings(data.bookings);
      setLoading(false)
    };

    const fetchActiveBookingsByGarage = async (id: string) => {
      setLoading(true)
      const data = await bookingsService.ActiveListByGarage(id);
      setActiveBookings(data.bookings);
      setLoading(false)
    };


    if(gargageSelected !== ''){
      fetchActiveBookingsByGarage(gargageSelected)
    }else{
      fetchActiveBookings()
    }
  }, [gargageSelected, user.id])

  return (
    <>
      <HeaderUser />

      <div className="p-4">
      <BackButton to='/lista-menu-reservas ' />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">RESERVAS ACTIVAS</h1>
          <p>Consulta tus reservas activas</p>
        </div>

        <form>
          <select onChange={handleSelect} className="border border-black rounded-lg">
            <option key={1} value=''>Selecciona un establecimiento</option>
            {garageList?.data.garages.map((garage: IGarage) => (
              <option key={garage.id} value={garage.id}>{garage.name}</option>
            ))}
          </select>
        </form>
        {loading ? 
          <LoadingIcon width={36} />
        :
          <div>
            {activeBookings?.map((booking: IBooking) => (
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
                  booking.car?.user.rating ? booking.car?.user.rating : undefined
                }
                garageName={booking.garage.name}
              />
            ))}
            {(activeBookings?.length === 0 || !activeBookings) && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1 mt-4">
                <img src="/images/noPastBookings.svg" alt="no active bookings" />
                <span>No tienes ninguna reserva activa</span>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};
