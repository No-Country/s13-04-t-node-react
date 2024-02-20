import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export default function MenuRegister() {
  return (
    <div>
      <Header />
      <div className='flex flex-col gap-y-6 px-4 py-10'>
        <Link
          to='/registro/usuario/conductor'
          className='flex items-center gap-2 font-semibold'
        >
          <img src='/images/car.svg' alt='icon-car' />
          <p>Registrarse como conductor</p>
        </Link>

        <Link
          to='/registro/usuario/estacionamiento'
          className='flex items-center gap-2 font-semibold'
        >
          <img src='/images/geo.svg' alt='icon-car' />
          <p>Registrarse como estacionamiento</p>
        </Link>
      </div>
    </div>
  );
}
