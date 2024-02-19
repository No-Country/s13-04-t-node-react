import { Link } from 'react-router-dom';
import { HeaderClosedDriver } from '../components/HeaderClosedDriver';

export const MyDataDriver = () => {
  return (
    <>
      <HeaderClosedDriver />

      <div className='px-4 py-10'>
        <h1 className='text-2xl font-semibold'>Mis Datos</h1>

        <div className='flex items-center justify-center py-10'>
          <img src='/images/profile.png' alt='foto' />
        </div>

        <div className='mb-5'>
          <span>Nombre y apellido</span>
          <p className='font-semibold text-xl py-1'>Nombre del usuario</p>
          <div className='border border-[#5B5751]/60' />
        </div>

        <div className='mb-5'>
          <span>Documento de identidad</span>
          <p className='font-semibold text-xl py-1'>00 000 000</p>
          <div className='border border-[#5B5751]/60' />
        </div>

        <div className='mb-5'>
          <span>E-mail</span>
          <div className='flex justify-between'>
            <p className='font-semibold text-xl py-1'>usuario@example.com</p>
            <Link
              to='/editar-email'
              className='flex items-center font-semibold'
            >
              <img src='/images/edit.svg' alt='editar' />
              <span>Editar</span>
            </Link>
          </div>
          <div className='border border-[#5B5751]/60' />
        </div>

        <div className='mb-5'>
          <span>Celular</span>
          <div className='flex justify-between'>
            <p className='font-semibold text-xl py-1'>+54 11 0000 0000</p>
            <Link
              to='/editar-celular'
              className='flex items-center font-semibold'
            >
              <img src='/images/edit.svg' alt='editar' />
              <span>Editar</span>
            </Link>
          </div>
          <div className='border border-[#5B5751]/60' />
        </div>

        <div className='mb-5'>
          <span>Contraseña</span>
          <div className='flex justify-between'>
            <p className='font-semibold text-xl py-1'>*****************</p>
            <Link
              to='/editar-password'
              className='flex items-center font-semibold'
            >
              <img src='/images/edit.svg' alt='editar' />
              <span>Editar</span>
            </Link>
          </div>
          <div className='border border-[#5B5751]/60' />
        </div>
      </div>
    </>
  );
};
