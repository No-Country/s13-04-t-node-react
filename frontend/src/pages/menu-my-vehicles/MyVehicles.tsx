import { Link } from 'react-router-dom';
import { HeaderLogo } from '../../components/data-driver/HeaderLogo';

export const MyVehicles = () => {
  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-10'>
        <div className='pb-8'>
          <h1 className='font-semibold text-2xl'>MIS VEHICULOS</h1>
          <span>Gestioná tus vehículos</span>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='p-4 border border-[#5D2B2C] rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <img src='/images/vehicle.svg' alt='vehiculo' />
                <span className='uppercase text-2xl'>AA000AA</span>
              </div>
              <img src='/images/trash.svg' alt='bote' />
            </div>
          </div>

          <div className='p-4 border border-[#5D2B2C] rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <img src='/images/vehicle.svg' alt='vehiculo' />
                <span className='uppercase text-2xl'>AA000BB</span>
              </div>
              <img src='/images/trash.svg' alt='bote' />
            </div>
          </div>

          <Link
            to='/agregar-vehiculo'
            className='flex flex-col fixed bottom-10 inset-x-0 px-4'
          >
            <button
              type='button'
              className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
            >
              Añadir vehículo
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
