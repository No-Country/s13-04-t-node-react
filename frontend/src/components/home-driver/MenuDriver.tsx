import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { mobileMenuAtom } from '../../atoms/sidebar';
import { useSetAtom } from 'jotai';
import { useCurrentUser } from '../../hooks/auth';
import { useEffect } from 'react';

export const MenuDriver = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const setShowMobileMenu = useSetAtom(mobileMenuAtom);

  const logout = () => {
    authService.logout();
    navigate('/');
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setShowMobileMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className='sticky px-4 py-10'>
      <div className='flex items-center gap-8'>
        <img src='/images/photo.png' alt='foto' />
        <div>
          <h4 className='text-2xl font-semibold uppercase'>{user.name}</h4>
          {!user.rating ? null : <span className='text-xl'>{user.rating}</span>}
        </div>
      </div>

      <div className='flex flex-col gap-4 py-6 font-semibold'>
        <Link to='/mis-datos' className='flex items-center gap-2'>
          <img src='/images/user-icon.svg' alt='usuario-icon' />
          <h5>Mis datos</h5>
        </Link>
        <Link to='/mis-vehiculos' className='flex items-center gap-2'>
          <img src='/images/car-icon.svg' alt='car-icon' />
          <h5>Mis vehículos</h5>
        </Link>
      </div>
      <div className='border border-[#5B5751]/60' />

      <div className='flex flex-col gap-4 py-6 font-semibold'>
        <Link to='/lista-menu-reservas' className='flex items-center gap-2'>
          <img src='/images/reserva-icon-black.svg' alt='reserva-icon' />
          <h5>Reservas</h5>
        </Link>
        <Link to='/garajes-favoritos' className='flex items-center gap-2'>
          <img src='/images/favorite-icon.svg' alt='favorite-icon' />
          <h5>Favoritos</h5>
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
