import { Link } from 'react-router-dom';

export const HeaderClosedDriver = () => {
  return (
    <div className='p-4 flex justify-between bg-[#D9D9D9] sticky top-0 z-50'>
      <Link to='/'>
        <img src='/images/logo.png' alt='logo' />
      </Link>

      <Link to='/'>
        <button type='button'>
          <img src='/images/close.svg' alt='icon-close' />
        </button>
      </Link>
    </div>
  );
};
