import { Link } from 'react-router-dom';

export const HeaderLogo = () => {
  return (
    <div className='p-4 flex justify-between bg-white sticky top-0 z-50 border-b shadow-md'>
      <Link to='/'>
        <img src='/images/logo.png' alt='logo' />
      </Link>
    </div>
  );
};
