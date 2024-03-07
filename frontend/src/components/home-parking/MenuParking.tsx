import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { mobileMenuAtom } from '../../atoms/sidebar';
import { useSetAtom } from 'jotai';
import { useCurrentUser } from '../../hooks/auth';
import { useEffect } from 'react';

export const MenuParking = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const setShowMobileMenu = useSetAtom(mobileMenuAtom);

  const logout = () => {
    authService.logout();
    navigate('/');
  };
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  return (
    <div className='sticky px-4 py-10'>
      <div className='flex items-center gap-8'>
        <img
          src={user.image ?? '/images/photo.png'}
          alt='foto'
          className='w-16 aspect-square rounded-xl'
        />
        <div>
          <h4 className='text-2xl font-semibold'>{user.name}</h4>
        </div>
      </div>

      <div className='flex flex-col gap-4 py-6 font-semibold'>
        <Link to='/mis-datos' className='flex items-center gap-2'>
          <img src='/images/user-icon.svg' alt='usuario-icon' />
          <h5>Mis datos</h5>
        </Link>
        <Link to='/mis-estacionamientos' className='flex items-center gap-2'>
          <img src='/images/Parking.svg' alt='car-icon' />
          <h5>Mis establecimientos</h5>
        </Link>
      </div>
      <div className='border border-[#5B5751]/60' />

      <div className='flex flex-col gap-4 py-6 font-semibold'>
        <Link to='/lista-menu-reservas' className='flex items-center gap-2'>
          <img src='/images/reserva-icon.svg' alt='reserva-icon' />
          <h5>Reservas</h5>
        </Link>
      </div>
      <div className='border border-[#5B5751]/60' />

      <div className='flex flex-col gap-4 py-6 font-semibold'>
        <Link to='ayuda' className='flex items-center gap-2'>
          <img src='/images/help-icon.svg' alt='help-icon' />
          <h5>Ayuda</h5>
        </Link>
        <button
          type='button'
          onClick={logout}
          className='flex items-center gap-2'
        >
          <img src='/images/logout-icon.svg' alt='logout-icon' />
          <h5>Cerrar sesión</h5>
        </button>
      </div>
      <div className='border border-[#5B5751]/60' />
    </div>
  );
};
