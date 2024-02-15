import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='p-4 flex justify-between bg-[#D9D9D9]'>
      <Link to='/'>
        <img src='/images/logo.png' alt='logo' />
      </Link>
      <div className='flex items-center gap-2'>
        <Link
          to='/acceso'
          className='px-3 py-1 font-semibold rounded-lg bg-white'
        >
          Inicia sesión
        </Link>
        <Link
          to='/menu/registro'
          className='px-3 py-1 font-semibold rounded-lg bg-white'
        >
          Registrate
        </Link>
      </div>
    </div>
  );
};
