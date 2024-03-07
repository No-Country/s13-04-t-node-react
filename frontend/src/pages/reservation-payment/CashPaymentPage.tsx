import { Link, useParams } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { MdOutlineMessage } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { garageService } from '../../services/garage';
import { IGarage } from '../../types/garage';
import { bookingService } from '../../services/booking';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { Booking } from '../../types/booking';
const daysOfWeek = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
const monthsOfYear = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const addZeroToTime = (time: number) => {
  return time.toString().padStart(2, '0');
};
export const CashPaymentPage = () => {
  const { idBooking } = useParams();

  const [booking, setBooking] = useState<Booking>({
    id: '',
    date_start: '',
    date_end: '',
    status: '',
    id_car: '',
    id_garage: '',
  });
  const [parking, setParking] = useState<IGarage>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (idBooking !== undefined) {
      bookingService.getById(idBooking).then((resBooking) => {
        setBooking(resBooking.booking);
        garageService
          .getById(resBooking.booking.garage.id)
          .then((resParking) => {
            setParking(resParking);
            setIsLoading(false);
          });
      });
    }
  }, []);
  return (
    <>
      <HeaderUser />
      {isLoading ? (
        <LoadingIcon width={50} />
      ) : (
        <>
          <div className='p-4'>
            <div className='flex flex-col gap-1 py-6'>
              <h1 className='text-xl font-normal uppercase'>
                ¡RESERVA CONFIRMADA!
              </h1>
              <p>Tu reserva ha sido confirmada</p>
            </div>

            <div className='p-4 shadow-md rounded'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between gap-1'>
                  <div className='flex flex-col gap-1'>
                    <h2 className='text-xl font-normal'>{parking?.name}</h2>
                    <span className='line-clamp-1'>{parking?.address}</span>
                  </div>

                  <MdOutlineMessage className='text-3xl' />
                </div>

                <div className='flex items-center justify-between gap-2'>
                  <div className='p-3 bg-[#D58418] rounded-md text-center w-full font-normal'>
                    <span>
                      {daysOfWeek.map((day, index) => {
                        const dayBooking = new Date(
                          booking.date_start
                        ).getDay();
                        return dayBooking === index && day;
                      })}
                      <br />
                      {monthsOfYear.map((month, index) => {
                        const monthBooking = new Date(
                          booking.date_start
                        ).getMonth();
                        const numberDayBooking = new Date(
                          booking.date_start
                        ).getDate();
                        return (
                          monthBooking === index &&
                          `${numberDayBooking} de ${month}`
                        );
                      })}
                    </span>
                  </div>
                  <div className='p-3 border border-[#D58418] bg-white rounded-md text-center w-full font-normal'>
                    <div className='grid grid-cols-2 gap-1'>
                      <div className='flex flex-col gap-1 items-start'>
                        <p>Inicio:</p>
                        <p>Fin:</p>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <p>
                          {addZeroToTime(
                            new Date(booking.date_start).getHours()
                          )}
                          :
                          {addZeroToTime(
                            new Date(booking.date_start).getMinutes()
                          )}
                        </p>
                        <p>
                          {addZeroToTime(new Date(booking.date_end).getHours())}
                          :
                          {addZeroToTime(
                            new Date(booking.date_end).getMinutes()
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2'>
                  <span>CÓDIGO DE RESERVA:</span>
                  <span>2548793</span>
                </div>
                <span className='text-center text-2xl'>
                  {booking.status === 'active' && 'RESERVA ABONADA'}
                </span>
              </div>
            </div>
          </div>

          <div className='p-4 flex flex-col sticky bottom-0 inset-x-0 mt-auto bg-white'>
            <Link
              className='py-2 text-center bg-[#D58418] rounded-3xl font-normal w-full'
              to='/lista-menu-reservas'
            >
              Aceptar
            </Link>
          </div>
        </>
      )}
    </>
  );
};
