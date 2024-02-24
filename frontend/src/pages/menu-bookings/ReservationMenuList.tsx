import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/home-driver/HeaderUser';

export const ReservationMenuList = () => {
  return (
    <>
      <HeaderUser />

      <div className='p-4'>
        <h1 className='text-2xl font-semibold uppercase'>Reservas</h1>

        <div className='flex flex-col gap-4 py-6 font-semibold'>
          <Link to='/reservas-pendientes' className='flex items-center gap-1'>
            <img src='/images/reserva-icon.svg' alt='reserva-icon' />
            <h5>Reservas pendientes</h5>
          </Link>
          <Link to='/reservas-activas' className='flex items-center gap-1'>
            <img src='/images/reserva-icon.svg' alt='reserva-icon' />
            <h5>Reservas activas</h5>
          </Link>
          <Link to='/reservas-pasadas' className='flex items-center gap-1'>
            <img src='/images/reserva-icon.svg' alt='reserva-icon' />
            <h5>Reservas pasadas</h5>
          </Link>
        </div>
      </div>
    </>
  );
};
