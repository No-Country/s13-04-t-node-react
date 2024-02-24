import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/home-driver/HeaderUser';

export const RejectedReservationPage = () => {
  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <h1 className='text-xl font-semibold uppercase pb-2'>
          ¡RESERVA RECHAZADA!
        </h1>
        <p>
          Lo sentimos, tu reserva ha sido rechazada.
          <br /> Intenta reservar en otro garaje.
        </p>
        <Link to='/' className='flex flex-col fixed bottom-6 inset-x-0 px-4'>
          <button
            type='submit'
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
          >
            Volver al Home
          </button>
        </Link>
      </div>
    </>
  );
};
