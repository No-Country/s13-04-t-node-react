import { HeaderUser } from "../../components/shared/HeaderUser";
import { ParkingReservatiosCard } from "../../components/parkingReservation/ParkingReservationCard";
import BackButton from "../../components/utilities/Backbutton";
import { useCurrentUser } from "../../hooks/auth";
import { bookingsService } from "../../services/bookings";
import useSWR from "swr";
import { LoadingIcon } from "../../components/shared/LoadingIcon";
import { useState, useEffect } from "react";
import { IBooking, IGarage } from "../../types/bookings";
import { garageService } from "../../services/garage";

export const PastParkingReservation = () => {
  const [pastBookings, setPastBookings] = useState<IBooking[] | undefined>()
  const [loading, setLoading] = useState(false)
  const [gargageSelected, setGarageSelected] = useState<string>('')

  const user = useCurrentUser();
  
  const {data: garageList} = useSWR(['garage-list'] , () => 
    garageService.getByUserId(user.id)
  )

  useEffect(() =>{
    const fetchPendingBookings = async () => {
      setLoading(true)
      const data = await bookingsService.PastList(user.id);
      setPastBookings(data);
      setLoading(false)
    };

    const fetchPendingBookingsByGarage = async (id: string) => {
      setLoading(true)
      const data = await bookingsService.PastListByGarage(id);
      setPastBookings(data);
      setLoading(false)
    };


    if(gargageSelected !== ''){
      fetchPendingBookingsByGarage(gargageSelected)
    }else{
      fetchPendingBookings()
    }
  }, [gargageSelected, user.id])

  const handleSelect = (e) => {
    e.stopPropagation()
    setGarageSelected(e.target.value)
  }

  return (
    <>
      <HeaderUser />
      <div className="p-4">
        <BackButton to="/lista-menu-reservas " />
        <div className="flex flex-col gap-1 py-6">
          <h1 className="text-2xl font-semibold uppercase">RESERVAS PASADAS</h1>
          <p>Consulta tus historial de reservas</p>
        </div>


        <form>
          <select onChange={handleSelect} className="border border-black rounded-lg">
            <option key={1} value=''>Selecciona un establecimiento</option>
            {garageList?.data.garages.map((garage: [IGarage]) => (
              <option key={garage.id} value={garage.id}>{garage.name}</option>
            ))}
          </select>
        </form>

        {loading ? 
          <LoadingIcon width={36} />
        :
          <div>
            {pastBookings?.bookings.map((booking: any) => (
              <ParkingReservatiosCard
                key={booking.id}
                showDate={false}
                showChat={false}
                showImgUser={false}
                showModel={false}
                showButtons={false}
                isLink={true}
                carIconSrc="/images/car-white-icon.svg"
                id={booking.id}
                textColor="text-white"
                bgColor="bg-[#5B5751]"
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
            {pastBookings?.bookings.length === 0 && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1 mt-4">
                <img src="/images/noPastBookings.svg" alt="no past bookings" />
                <span>No tienes ninguna reserva pasada</span>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};
