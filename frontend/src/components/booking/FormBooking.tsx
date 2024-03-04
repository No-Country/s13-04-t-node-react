import { useEffect, useState } from 'react';
import { garageService } from '../../services/garage';
import { IGarage } from '../../types/garage';
import Carousel from './Carousel';
import Header from './Header';
import Schedule from './Schedule';
import CustomButton from '../utilities/CustomButton';

interface FormBookingProps {
  garajeId: string;
  userId: string;
}
export const FormBooking: React.FC<FormBookingProps> = ({
  garajeId,
  userId,
}) => {
  const [garaje, setGaraje] = useState<IGarage>();

  useEffect(() => {
    garageService.getById(garajeId).then((res) => setGaraje(res));
    // console.log('user: ', userId);
  }, [garajeId, userId]);

  const reservationSearchParams = new URLSearchParams({
    garage: garajeId,
  });

  const reservationUrl = `/reservar-horario-vehiculo?${reservationSearchParams.toString()}`;

  return (
    <div className='px-4 py-6 flex flex-col gap-6 w-full'>
      {/* Carrusel de imagenes */}
      {garaje && <Carousel images={garaje.images} garajeId={garajeId} />}

      {/* encabezado */}
      {garaje && (
        <Header
          rating={garaje.rating}
          name={garaje.name}
          address={garaje.address}
          price={garaje.price}
        />
      )}

      {/* horairos */}
      {garaje && <Schedule schedule={garaje.schedule} />}

      {/* mapa */}
      <div className='flex justify-between gap-10 bg-[#FFE9CC] px-8 py-2 rounded-md'>
        <img src='/images/location.svg' alt='localizacion' />
        <div>
          <h4 className='text-xl font-semibold'>Ver mapa</h4>
          <p>Ubica los estacionamientos cercanos</p>
        </div>
      </div>

      {/* boton */}
      <CustomButton to={reservationUrl} text='Reservar' type='primary' />
    </div>
  );
};
