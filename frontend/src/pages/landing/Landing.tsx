import { HeaderLanding } from '../../components/landing/HeaderLanding';
import CustomButton from '../../components/utilities/CustomButton';

export default function Landing() {
  return (
    <>
      <HeaderLanding />
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
          <CustomButton to='/informacion' text='Mas informacion' type='secondary' extraProps={{}} />
          <CustomButton to='/registro' text='Comenzar' type='primary' extraProps={{}} />

        </div>

        <div>
          <img
            src='/images/image.png'
            alt='imagen'
            className='w-full object-cover'
          />
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

            <CustomButton to='registro' type='primary' text='Registrate como conductor' />
          </div>
        </div>

        <div>
          <img
            src='/images/image.png'
            alt='imagen'
            className='w-full object-cover'
          />
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
            <CustomButton to='registro' type='primary' text='Registrate como estacionamiento' />
          </div>
        </div>
      </div>
    </>
  );
}
