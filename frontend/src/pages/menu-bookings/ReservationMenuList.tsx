import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { useCurrentUser } from "../../hooks/auth";

export const ReservationMenuList = () => {
  const user = useCurrentUser();

  const generateRoutes = (path: string) => {    
    const baseRoute = user.role === 'parking' ? '/reservasParking' : '/reservas';
    return `${baseRoute}${path}`;
  };

  return (
    <>
      <HeaderUser />

      <div className='p-4'>
        <h1 className='text-2xl font-semibold uppercase'>Reservas</h1>

        <div className='flex flex-col gap-4 py-6 font-semibold'>
          <Link to={generateRoutes('/pendientes')} className='flex items-center gap-1'>
            <img src='/images/reserva-icon.svg' alt='reserva-icon' />
            <h5>Reservas pendientes</h5>
          </Link>
          <Link to={generateRoutes('/activas')} className='flex items-center gap-1'>
            <img src='/images/reserva-icon.svg' alt='reserva-icon' />
            <h5>Reservas activas</h5>
          </Link>
          <Link to={generateRoutes('/pasadas')} className='flex items-center gap-1'>
            <img src='/images/reserva-icon.svg' alt='reserva-icon' />
            <h5>Reservas pasadas</h5>
          </Link>
        </div>
      </div>
    </>
  );
};
