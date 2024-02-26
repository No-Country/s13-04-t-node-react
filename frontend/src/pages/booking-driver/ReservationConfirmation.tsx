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

        <Link to='/metodo-de-pago'>
          <div className='flex flex-col fixed bottom-6 inset-x-0 px-4'>
            <button
              type='submit'
              className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
            >
              Volver al Home
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};
