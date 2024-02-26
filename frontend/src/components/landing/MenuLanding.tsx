import { useSetAtom } from 'jotai';
import { Link, useLocation } from 'react-router-dom';
import { mobileMenuAtom } from '../../atoms/sidebar';
import { useEffect } from 'react';

export const MenuLanding = () => {
  const location = useLocation();
  const setShowMobileMenu = useSetAtom(mobileMenuAtom);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setShowMobileMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <div className='flex flex-col gap-y-6 px-4 py-10'>
        <Link to='/acceso' className='flex items-center font-semibold'>
          <img src='/images/user-icon.svg' alt='icon-car' />
          <p>Inicia sesión</p>
        </Link>

        <div className='border border-black/40' />

        <Link
          to='/registro/usuario/conductor'
          className='flex items-center gap-2 font-semibold'
        >
          <img src='/images/car.svg' alt='icon-car' className='pl-1' />
          <p>Registrarse como conductor</p>
        </Link>

        <Link
          to='/registro/usuario/estacionamiento'
          className='flex items-center gap-2 font-semibold'
        >
          <img src='/images/geo.svg' alt='icon-car' className='pl-1' />
          <p>Registrarse como estacionamiento</p>
        </Link>
      </div>
    </>
  );
};
