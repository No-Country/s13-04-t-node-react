import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { useState, useEffect } from 'react';
import { IBooking } from '../../types/bookings';
import { ICar } from '../../types/vehicule';
import { vehiculeService } from '../../services/vehicule';
import useSWR from 'swr';
import { useCurrentUser } from '../../hooks/auth';
import { bookingsService } from '../../services/bookings';
import { format } from 'date-fns';
import { CarReservationCard } from '../../components/carReservation/CarReservationCard';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { useNavigate } from 'react-router-dom';

export const PastReservations = () => {
  const [pastBookings, setPastBookings] = useState<IBooking[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [carSelected, setCarSelected] = useState<string>('')

  const navigate = useNavigate();

  const user = useCurrentUser();

  const { data: carList } = useSWR(['car-list'], () =>
    vehiculeService.getByUserId(user.id)
  )

  useEffect(() => {
    const fetchPastBookings = async () => {
      setLoading(true)
      const data = await bookingsService.PastListCar(user.id);
      setPastBookings(data.bookings);
      setLoading(false)
    };

    const fetchPastBookingsByCar = async (id: string) => {
      setLoading(true)
      const data = await bookingsService.PastListByCar(id);
      setPastBookings(data.bookings);
      setLoading(false)
    };

    if (carSelected !== '') {
      fetchPastBookingsByCar(carSelected)
    } else {
      fetchPastBookings()
    }
  }, [carSelected, user.id])


  const handleSelect = (e) => {
    e.stopPropagation()
    setCarSelected(e.target.value)
  }

  const handleRedirect = (e, id: string) => {
    navigate(`/reservar/${id}`)
  }

  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>RESERVAS PASADAS</h1>
          <p>Consulta tu historial de reservas</p>
        </div>

        <form>
          <select onChange={handleSelect} className="border border-black rounded-lg mb-3">
            <option key={1} value=''>Selecciona un vehiculo</option>
            {carList?.data.cars.map((car: ICar) => (
              <option key={car.id} value={car.id}>{car.plate}</option>
            ))}
          </select>
        </form>

        {loading ?
          <LoadingIcon width={36} />
          :
          <div>
            {pastBookings?.map((booking: IBooking) => (
              <CarReservationCard
                name={booking.garage.name}
                address={booking.garage.address}
                time={format(new Date(booking.date_start), 'MM/dd - HH:mm')}
                plate={booking.car.plate}
                past={true}
                key={booking.id}
                onCancel={(e) => handleRedirect(e, booking.garage.id)}
              />
            ))}
            {(pastBookings?.length === 0 || !pastBookings) && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1 mt-4">
                <img src="/images/BookingCarPast.svg" alt="no past bookings" />
                <span>No tienes ninguna reserva pasada</span>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};
