import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { CarReservationCard } from '../../components/carReservation/CarReservationCard';
import { bookingsService } from '../../services/bookings';
import { useEffect, useState } from 'react';
import { IBooking } from '../../types/bookings';
import { useCurrentUser } from '../../hooks/auth';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { format } from "date-fns"
import { vehiculeService } from '../../services/vehicule';
import useSWR from 'swr';
import { ICar } from '../../types/vehicule';

export const ActiveReservations = () => {
  const [activeBookings, setActiveBookings] = useState<IBooking[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [carSelected, setCarSelected] = useState<string>('')


  const user = useCurrentUser();

  const { data: carList } = useSWR(['car-list'], () =>
    vehiculeService.getByUserId(user.id)
  )

  useEffect(() => {
    const fetchActiveBookings = async () => {
      setLoading(true)
      const data = await bookingsService.ActiveListCar(user.id);
      setActiveBookings(data.bookings);
      setLoading(false)
    };

    const fetchActiveBookingsByCar = async (id: string) => {
      setLoading(true)
      const data = await bookingsService.ActiveListByCar(id);
      setActiveBookings(data.bookings);
      setLoading(false)
    };

    if (carSelected !== '') {
      fetchActiveBookingsByCar(carSelected)
    } else {
      fetchActiveBookings()
    }
  }, [carSelected, user.id])


  const handleSelect = (e) => {
    e.stopPropagation()
    setCarSelected(e.target.value)
  }

  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>RESERVAS ACTIVAS</h1>
          <p>Consulta tus reservas activas</p>
        </div>

        <form>
          <select onChange={handleSelect} className="border border-black rounded-lg mb-3">
            <option key={1} value=''>Selecciona un vehículo</option>
            {carList?.data.cars.map((car: ICar) => (
              <option key={car.id} value={car.id}>{car.plate}</option>
            ))}
          </select>
        </form>

        {loading ?
          <LoadingIcon width={36} />
          :
          <div>
            {activeBookings?.map((booking: IBooking) => (
              <CarReservationCard
                name={booking.garage.name}
                address={booking.garage.address}
                time={format(new Date(booking.date_start), 'MM/dd - HH:mm')}
                plate={booking.car.plate}
                key={booking.id}
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
