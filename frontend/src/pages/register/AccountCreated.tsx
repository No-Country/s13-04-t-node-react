import { Link } from 'react-router-dom';
import { HeaderLanding } from '../../components/landing/HeaderLanding';

export default function AccountCreated() {
  return (
    <>
      <HeaderLanding />
      <div className='px-4 py-8'>
        <div>
          <h1 className='font-semibold text-xl'>¡FELICITACIONES!</h1>
          <p>Tu cuenta se ha creado correctamente</p>
        </div>
      </div>

      <Link to='/' className='flex flex-col fixed bottom-6 inset-x-0 px-4'>
        <button
          type='submit'
          className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
        >
          Ir a mi cuenta
        </button>
      </Link>
    </>
  );
}
