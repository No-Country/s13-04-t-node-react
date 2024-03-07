import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { useState, useEffect, SetStateAction } from 'react';
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
import { ReviewModal } from '../../components/shared/reviewModal';
import { reviewService } from '../../services/review';
import {toast, Slide} from 'react-toastify';

export const PastReservations = () => {
  const [pastBookings, setPastBookings] = useState<IBooking[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [carSelected, setCarSelected] = useState<string>('')
  const [openModal, setOpenModal] = useState(false)
  const [currentGarage, setCurrentGarage] = useState<string>('')


  const navigate = useNavigate();
  const user = useCurrentUser();


  const handlePostReview = (rating: number) => {
    reviewService.createReview({
      id_author: user.id,
      id_receiver: currentGarage,
      type: 'Garage',
      rating: rating,
      comment: ''
    })
      .then(res => res.status === 200 ? handleRedirect(currentGarage) : 
        toast.error('Algo salió mal', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Slide,
        })
      )
  }

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


  const handleSelect = (e: { stopPropagation: () => void; target: { value: SetStateAction<string>; }; }) => {
    e.stopPropagation()
    setCarSelected(e.target.value)
  }

  const handleRedirect = (id: string) => {
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
                handleRedirect={() => {
                  handleRedirect(booking.garage.id)
                }}
                name={booking.garage.name}
                address={booking.garage.address}
                start={format(new Date(booking.date_start), 'MM/dd - HH:mm')}
                end={format(new Date(booking.date_end), 'MM/dd - HH:mm')}
                plate={booking.car.plate}
                past={true}
                key={booking.id}
                onAction={() => {
                  setCurrentGarage(booking.garage.id)
                  setOpenModal(true)
                }}
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
      {openModal && <ReviewModal setOpenModal={setOpenModal} handlePostReview={handlePostReview} />}
    </>
  );
};
