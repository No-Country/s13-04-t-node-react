import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';

export const AccountCreated = () => {
  return (
    <>
      <HeaderUser />
      <div className='px-4 py-8 flex flex-col h-[80dvh]'>
        <div>
          <h1 className='font-semibold text-xl'>¡FELICITACIONES!</h1>
          <p>Tu cuenta se ha creado correctamente</p>
        </div>
        <img
          src='/images/Cuenta-creada.svg'
          className='w-full max-w-[400px] m-auto'
        />
      </div>

      <Link to='/' className='flex flex-col px-4'>
        <button
          type='submit'
          className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
        >
          Ir a mi cuenta
        </button>
      </Link>
    </>
  );
};
