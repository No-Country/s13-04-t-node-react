import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { CarReservationCar } from '../../components/carReservation/CarReservationCar';
import { bookingsService } from '../../services/bookings';
import { useEffect, useState } from 'react';
import { IBooking } from '../../types/bookings';
import { useCurrentUser } from '../../hooks/auth';
import { LoadingIcon } from '../../components/shared/LoadingIcon';

export const ActiveReservations = () => {
  const [activeBookings, setActiveBookings] = useState<IBooking[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [carSelected, setCarSelected] = useState<string>('')


  const user = useCurrentUser();
  
  useEffect(() => {
    const fetchActiveBookings = async () => {
      setLoading(true)
      const data = await bookingsService.ActiveListCar(user.id);
      console.log(data)
      setActiveBookings(data.bookings);
      setLoading(false)
    };

/*     const fetchActiveBookingsByGarage = async (id: string) => {
      setLoading(true)
      const data = await bookingsService.ActiveListByGarage(id);
      setActiveBookings(data);
      setLoading(false)
    };
 */
    if(carSelected !== ''){
      console.log('aca')
    }else{
      fetchActiveBookings()
    }
  }, [carSelected, user.id])

  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>RESERVAS ACTIVAS</h1>
          <p>Consulta tus reservas activas</p>
        </div>

        {loading ? 
          <LoadingIcon width={36}/>
        :
          <div>
            {activeBookings?.map((booking: IBooking) => (
              <CarReservationCar 
              name={booking.garage.name} 
              address='Av. Directorio 3452, CABA, Argentina'
              time='04/02/21 - 10:00 - 12:00'
              plate={booking.car.plate}
              key={booking.id}
              />
            ))}
          </div>
        }

{/*         <CarReservationCar 
          name='Garaje de Juan' 
          address='Av. Directorio 3452, CABA, Argentina'
          time='04/02/21 - 10:00 - 12:00'
          plate='ABC123'
          /> */}
      </div>
    </>
  );
};
