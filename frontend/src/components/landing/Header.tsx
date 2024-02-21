import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='p-4 flex justify-between bg-white shadow-md'>
      <Link to='/'>
        <img src='/images/logo.png' alt='logo' />
      </Link>
      <div className='flex items-center gap-2'>
        <Link
          to='/acceso'
          className='px-2 py-1 font-semibold rounded-lg bg-white text-sm'
        >
          Inicia sesión
        </Link>
        <Link
          to='/registro'
          className='px-2 py-1 font-semibold rounded-lg bg-white text-sm'
        >
          Registrate
        </Link>
      </div>
    </div>
  );
};
