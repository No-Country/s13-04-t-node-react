import { HeaderLanding } from '../../components/landing/HeaderLanding';
import CustomButton from '../../components/utilities/CustomButton';

export const Landing = () => {
  return (
    <>
      <HeaderLanding />
      <div className='grid grid-cols-1 px-4 py-16'>
        <div className='relative flex flex-col text-xl'>
          <div className='absolute right-3'>
            <img
              src='/images/vehicleLogin.svg'
              alt='Comienza a usar nuestros servicios'
            />
          </div>

          <div className='flex flex-col relative w-40 text-2xl gap-4'>
            <h1>Encontra tu estacionamiento Alquila tu cochera</h1>
            <h2>
              Descubre una nueva forma <br /> de estacionar
            </h2>
          </div>
        </div>

        <div className='flex flex-col items-center gap-4 py-8'>
          <CustomButton
            to='/informacion'
            text='Mas informacion'
            type='secondary'
            extraProps={{}}
          />
          <CustomButton
            to='/acceso'
            text='Comenzar'
            type='primary'
            extraProps={{}}
          />
        </div>

        <div>
          <img
            src='/images/vehicleLoginTwo.svg'
            alt='imagen'
            className='w-full object-cover'
          />
          <div className='flex flex-col py-6'>
            <h1 className='uppercase font-semibold text-xl'>
              ¿NECESITAS UN LUGAR PARA
              <br /> ESTACIONAR?
            </h1>
            <p className='py-4 text-sm text-balance '>
              Encuentra fácilmente un lugar para estacionar tu vehículo a través
              de estacionAPP. Busca por zonas y disponibilidad en tiempo real.
              Reserva tu espacio, con anticipación o en el momento, de manera
              rápida y segura.
            </p>

            <CustomButton
              to='/registro/usuario/conductor'
              type='primary'
              text='Registrate como conductor'
            />
          </div>
        </div>

        <div>
          <img
            src='/images/parkingLoginOne.svg'
            alt='imagen'
            className='w-full object-cover'
          />
          <div className='flex flex-col pt-10'>
            <h1 className='uppercase font-semibold text-xl'>
              ¿QUERES GENERAR GANANCIAS
              <br /> ALQUILANDO TU COCHERA?
            </h1>
            <p className='py-4 text-sm text-balance '>
              Maximiza tus ingresos alquilando tu cochera privada a través de
              estacionAPP. Con un sistema de reseñas transparente, puedes estar
              seguro de recibir a conductores confiables y generar ingresos
              adicionales de manera sencilla.
            </p>
            <CustomButton
              to='/registro/usuario/estacionamiento'
              type='primary'
              text='Registrate como estacionamiento'
            />
          </div>
        </div>
        <div className='mt-8'>
          <img
            src='/images/parkingLoginTwo.svg'
            alt='imagen'
            className='w-full object-cover'
          />
          <div className='flex flex-col pt-10'>
            <h1 className='uppercase font-semibold text-xl'>
              ¿BUSCAS QUE MAS CONDUCTORES
              <br /> LLEGUEN A TU ESTACIONAMIENTO?
            </h1>
            <p className='py-4 text-sm text-balance '>
              Amplía tu alcance y atrae a más conductores a tu estacionamiento
              utilizando estacionAPP. Con una amplia base de usuarios, llegarás
              a más personas y aumentarás la ocupación de tu estacionamiento de
              manera efectiva.
            </p>
            <CustomButton
              to='/registro/usuario/parking'
              type='primary'
              text='Registrate como estacionamiento'
            />
          </div>
        </div>
      </div>
    </>
  );
};
