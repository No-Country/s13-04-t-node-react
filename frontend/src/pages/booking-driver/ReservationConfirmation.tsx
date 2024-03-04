import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';

export const ReservationConfirmation = () => {
  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-xl font-semibold uppercase'>
            ESPERANDO CONFIRMACIÓN
          </h1>
          <p className='text-lg pb-6'>Tu reserva necesita confirmación</p>

          <span>El dueño del estacionamiento debe confirmar la reserva.</span>
          <span>
            Esto puede llevar unos minutos. Te enviaremos un mail cuando este
            confirmada.
          </span>
        </div>
        <img src='/images/Esperando.svg' className='w-11/12 m-auto' />
        <Link
          to='/'
          className='py-2 bg-[#D58418] rounded-3xl font-semibold flex px-4 justify-center mt-10'
        >
          Aceptar
        </Link>
      </div>
    </>
  );
};
