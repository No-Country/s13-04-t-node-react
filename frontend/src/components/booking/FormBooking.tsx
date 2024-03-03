import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { garageService } from '../../services/garage';
import { IGarage } from '../../types/garage';
import Carousel from './Carousel';
import Header from './Header';
import Schedule from './Schedule';
import CustomButton from '../utilities/CustomButton';

interface FormBookingProps {
  garajeId: string;
}
export const FormBooking: React.FC<FormBookingProps> = ({ garajeId }) => {
  const [garaje, setGaraje] = useState<IGarage>();

  //cambiar por no disponibles del garaje
  const excludeDays = [new Date('2024-03-06 22:00'), new Date('2024-03-08 '), new Date('2024-03-05')]

  useEffect(() => {
    garageService.getById(garajeId)
      .then((res) => setGaraje(res));
  }, [garajeId]);

  return (
    <div className='px-4 py-6 h-screen flex flex-col gap-6'>
      {/* Carrusel de imagenes */}
      {garaje &&
        <Carousel
          images={garaje.images}
          garajeId={garajeId}
        />
      }
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
      {garaje &&
        <Schedule schedule={garaje.schedule} excludeDays={excludeDays} />
      }

      {/* mapa */}
      <section className='bg-[#FFE9CC] w-328 h-[72px] rounded-4 py-8 px-0 gap-x-24 flex items-center justify-center'>
        <Link to='/#' className='flex items-center space-x-2 text-black'>
          <img
            className='h-6 w-6'
            src='/images/location.svg'
            alt='location icon'
          />
          <span className='text-lg ml-2'>Ver mapa</span>
        </Link>
      </section>

      {/* boton */}
      <CustomButton
        to='/reservar-horario-vehiculo'
        text='Reservar'
        type='primary'
      />
    </div>
  );
};
