import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { mobileMenuAtom } from '../../atoms/sidebar';
import clsx from 'clsx';
import { MenuLanding } from './MenuLanding';

export const HeaderLanding = () => {
  const [showMobileMenu, setShowMobileMenu] = useAtom(mobileMenuAtom);

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className='p-4 flex justify-between bg-white shadow-md sticky top-0 z-50'>
      <Link to='/'>
        <img src='/images/logo.png' alt='logo' />
      </Link>

      <nav
        className={clsx(
          'fixed flex flex-col bg-white w-full h-full top-[78px] transition-all duration-500 z-30',
          showMobileMenu ? 'right-0' : '-right-full'
        )}
      >
        <MenuLanding />
      </nav>

      <button type='button' onClick={toggleMenu}>
        {showMobileMenu ? (
          <img src='/images/close.svg' alt='icon-close' />
        ) : (
          <img src='/images/burguer.svg' alt='icon-burguer' />
        )}
      </button>
    </div>
  );
};
