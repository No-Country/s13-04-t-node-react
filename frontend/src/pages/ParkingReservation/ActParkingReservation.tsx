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
/*   const { data: activeBookings, isValidating } = useSWR(["active-bookins"], () =>
    bookingsService.ActiveList(user.id)
  ); */

  const {data: garageList} = useSWR(['garage-list'] , () => 
  garageService.getByUserId(user.id)
  )

  const handleSelect = (e) => {
    e.stopPropagation()
    setGarageSelected(e.target.value)
  }

  useEffect(() =>{
    const fetchPendingBookings = async () => {
      const data = await bookingsService.ActiveList(user.id);
      setActiveBookings(data);
    };

    const fetchPendingBookingsByGarage = async (id: string) => {
      const data = await bookingsService.ActiveListByGarage(id);
      console.log(data)
      setActiveBookings(data);
    };


    if(gargageSelected !== ''){
      fetchPendingBookingsByGarage(gargageSelected)
    }else{
      fetchPendingBookings()
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

        {loading ? 
          <LoadingIcon width={36} />
        :
          <div>
            <form>
              <select onChange={handleSelect}>
                <option value='' >Selecciona un garage</option>
                {garageList?.data.garages.map((garage: [IGarage]) => (
                  <option value={garage.id}>{garage.name}</option>
                ))}
              </select>
            </form>
            {activeBookings?.bookings.map((booking: any) => (
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
                  booking.car?.user.rating ? booking.car?.user.rating : null
                }
                garageName={booking.garage.name}
              />
            ))}
            {(activeBookings?.bookings.length === 0 || !activeBookings) && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1 mt-4">
                <img src="/images/noPastBookings.svg" alt="no active bookings" />
                <span>No tienes ninguna reserva pasada</span>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};
