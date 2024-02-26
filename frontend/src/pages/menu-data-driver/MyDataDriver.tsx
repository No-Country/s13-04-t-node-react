import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { useCurrentUser } from '../../hooks/auth';

export const MyDataDriver = () => {
  const user = useCurrentUser();

  return (
    <>
      <HeaderUser />

      <div className='px-4 py-10'>
        <h1 className='text-2xl font-semibold'>Mis Datos</h1>

        <div className='flex items-center justify-center py-10'>
          <img src='/images/profile.png' alt='foto' />
        </div>

        <div className='mb-5'>
          <span>Nombre y apellido</span>
          <p className='font-semibold text-xl py-1'>{user.name}</p>
          <div className='border border-[#5B5751]/60' />
        </div>

        <div className='mb-5'>
          <span>Documento de identidad</span>
          <p className='font-semibold text-xl py-1'>{user.identity}</p>
          <div className='border border-[#5B5751]/60' />
        </div>

        <div className='mb-5'>
          <span>E-mail</span>
          <div className='flex justify-between'>
            <p className='font-semibold text-xl py-1 flex-1 overflow-auto'>
              {user.email}
            </p>
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
            <p className='font-semibold text-xl py-1'>{user.phone}</p>
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
            <input
              type='text'
              placeholder='************'
              className='placeholder:text-black'
              value={user.password}
            />
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
