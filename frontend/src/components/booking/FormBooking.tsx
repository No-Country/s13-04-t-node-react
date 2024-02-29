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
  userId: string
}
export const FormBooking: React.FC<FormBookingProps> = ({ garajeId, userId }) => {
  const [garaje, setGaraje] = useState<IGarage>();

  //cambiar por no disponibles del garaje
  const excludeDays = [new Date('2024-02-25'), new Date('2024-02-27'), new Date('2024-03-02'),]

  useEffect(() => {
    garageService.getById(garajeId)
      .then((res) => setGaraje(res));
    // console.log('Garaje: ', garaje)
    // console.log('user: ', userId)
  }, [garajeId]);

  return (
    <div className='px-4 py-8 h-screen flex flex-col gap-6'>
      {/* Carrusel de imagenes */}
      {garaje &&
        <Carousel
          images={[
            'https://tse4.mm.bing.net/th?id=OIP.wkFW3sPbRMmNXoKnAKyelwHaFj&pid=Api&P=0&h=180',
            'https://tse2.mm.bing.net/th?id=OIP.CTTp75yu1mTgpRxM4sGK5gHaFj&pid=Api&P=0&h=180',
            'https://tse1.mm.bing.net/th?id=OIP.8HjWX5curav0AmsxCvY-pwAAAA&pid=Api&P=0&h=180',
          ]}
          garajeId={garajeId}
        />
      }
      {/* encabezado */}
      {garaje && (
        <Header
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
