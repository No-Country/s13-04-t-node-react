import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { CarReservationCard } from '../../components/carReservation/CarReservationCard';
import { useState, useEffect } from 'react';
import { IBooking } from '../../types/bookings';
import { format } from "date-fns"
import { vehiculeService } from '../../services/vehicule';
import useSWR from 'swr';
import { ICar } from '../../types/vehicule';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { bookingsService } from '../../services/bookings';
import { useCurrentUser } from '../../hooks/auth';
import { ModalConfirm } from '../../components/modal/Confirm';
import { bookingService } from '../../services/booking';

export const PendingReservations = () => {
  const [pendingBookings, setPendingBookings] = useState<IBooking[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [carSelected, setCarSelected] = useState<string>('')
  const [modalConfirm, setModalConfirm] = useState(false)
  const [currentBooking, setCurrentBooking] = useState<string>('')

  const user = useCurrentUser();

  const { data: carList } = useSWR(['car-list'], () =>
    vehiculeService.getByUserId(user.id)
  )

  useEffect(() => {
    const fetchPendingBookings = async () => {
      setLoading(true)
      const data = await bookingsService.PendingListCar(user.id);
      setPendingBookings(data.bookings);
      setLoading(false)
    };

    const fetchPendingBookingsByCar = async (id: string) => {
      setLoading(true)
      const data = await bookingsService.PendingListByCar(id);
      setPendingBookings(data.bookings);
      setLoading(false)
    };

    if (carSelected !== '') {
      fetchPendingBookingsByCar(carSelected)
    } else {
      fetchPendingBookings()
    }
  }, [carSelected, user.id])


  const handleSelect = (e) => {
    e.stopPropagation()
    setCarSelected(e.target.value)
  }

  const onCancel = (e, id) => {
    if (id) {
      setCurrentBooking(id)
    }
    setModalConfirm(prev => !prev)
  }

  const onDelete = () => {
    if (currentBooking) {
      bookingService.deleteBooking(currentBooking)
      setPendingBookings(prev => prev?.filter(booking => booking.id !== currentBooking))
    }
    setModalConfirm(false)
  }

  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>
            RESERVAS PENDIENTES
          </h1>
          <p>Revisa el estado de tus reservas</p>
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
            {pendingBookings?.map((booking: IBooking) => (
              <CarReservationCard
                name={booking.garage.name}
                address={booking.garage.address}
                time={format(new Date(booking.date_start), 'MM/dd - HH:mm')}
                plate={booking.car.plate}
                pending={true}
                onCancel={(e) => onCancel(e, booking.id)}
                key={booking.id}
              />
            ))}
            {(pendingBookings?.length === 0 || !pendingBookings) && (
              <div className="flex flex-col items-center justify-center font-semibold gap-1 mt-4">
                <img src="/images/noPending.svg" alt="no past bookings" />
                <span>No tienes ninguna reserva pendiente</span>
              </div>
            )}
          </div>
        }
      </div>
      {modalConfirm && <ModalConfirm title='Cancelar reserva' message='Estas seguro que deseas cancelar esta reserva?' onClose={onCancel} onConfirm={onDelete} />}
    </>
  );
};
