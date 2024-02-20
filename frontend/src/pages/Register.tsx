import { useParams } from 'react-router-dom';
import UserRegisterForm from '../components/UserRegisterForm';

export default function Register(): JSX.Element {
  const { type } = useParams();

  return (
    <main className='p-4'>
      {type === 'conductor' ? (
        <>
          <h1>REGÍSTRATE COMO CONDUCTOR</h1>
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
  );
}
