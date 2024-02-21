import { useParams } from 'react-router-dom';
import UserRegisterForm from '../../components/register/UserRegisterForm';
import { HeaderLogo } from '../../components/data-driver/HeaderLogo';

export default function Register(): JSX.Element {
  const { type } = useParams();

  return (
    <>
      <HeaderLogo />

      <main className='p-4'>
        {type === 'conductor' ? (
          <>
            <h1 className='font-semibold uppercase text-xl'>
              REGÍSTRATE COMO CONDUCTOR
            </h1>
            <p>Completa tus datos personales</p>
          </>
        ) : (
          <>
            <h1>REGÍSTRATE COMO ESTACIONAMIENTO</h1>
            <p>Completa tus datos personales</p>
          </>
        )}
        <UserRegisterForm />
      </main>
    </>
  );
}
