import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export default function Landing() {
  return (
    <>
      <Header />
      <div className='px-4 py-16'>
        <div className='flex flex-col gap-y-6 font-semibold text-xl'>
          <h1>
            Encontra tu estacionamiento
            <br /> Alquila tu cochera
          </h1>
          <h2>
            Descubre una
            <br /> nueva forma de estacionar
          </h2>
        </div>

        <div className='flex flex-col items-center gap-4 py-10'>
          <Link
            to='/information'
            className='px-3 py-1 font-semibold rounded-lg w-full border border-black bg-white text-center'
          >
            Más información
          </Link>
          <Link
            to='/menu/registro'
            className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center'
          >
            Registrate
          </Link>
        </div>

        <div>
          <img src='/images/image.png' alt='imagen' />
          <div className='flex flex-col py-6'>
            <h1 className='uppercase font-semibold text-xl'>
              ¿NECESITAS UN LUGAR PARA
              <br /> ESTACIONAR?
            </h1>
            <p className='py-4 text-sm text-balance'>
              Lorem ipsum dolor sit amet consectetur. Convallis semper libero
              sapien nunc pretium. Scelerisque tortor dictum nec urna quisque
              euismod hendrerit eget. Non morbi vel fames amet at et cursus.
              Aliquam enim augue quam posuere sed.
            </p>
            <Link
              to='/menu/registro'
              className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center'
            >
              Registrate como conductor
            </Link>
          </div>
        </div>

        <div>
          <img src='/images/image.png' alt='imagen' />
          <div className='flex flex-col pt-10'>
            <h1 className='uppercase font-semibold text-xl'>
              ¿QUERES GENERAR GANANCIAS
              <br /> ALQUILANDO TU COCHERA?
            </h1>
            <p className='py-4 text-sm text-balance'>
              Lorem ipsum dolor sit amet consectetur. Convallis semper libero
              sapien nunc pretium. Scelerisque tortor dictum nec urna quisque
              euismod hendrerit eget. Non morbi vel fames amet at et cursus.
              Aliquam enim augue quam posuere sed.
            </p>
            <Link
              to='/menu/registro'
              className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center'
            >
              Registrate como estacionamiento
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
