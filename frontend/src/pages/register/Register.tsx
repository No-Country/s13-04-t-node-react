import { useParams } from 'react-router-dom';
import UserRegisterForm from '../../components/register/UserRegisterForm';
import { HeaderLanding } from '../../components/landing/HeaderLanding';

export default function Register(): JSX.Element {
  const { type } = useParams();

  return (
    <>
      <HeaderLanding />

      <main className='p-4'>
        {type === 'conductor' ? (
          <>
            <h1 className='font-semibold uppercase text-lg'>
              REGÍSTRATE COMO CONDUCTOR
            </h1>
            <p>Completa tus datos personales</p>
          </>
        ) : (
          <>
            <h1 className='font-semibold uppercase text-lg'>
              REGÍSTRATE COMO ESTACIONAMIENTO
            </h1>
            <p>Completa tus datos personales</p>
          </>
        )}
        <UserRegisterForm />
      </main>
    </>
  );
}
