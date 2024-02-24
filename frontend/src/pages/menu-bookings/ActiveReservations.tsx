import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { MdOutlineMessage } from 'react-icons/md';

export const ActiveReservations = () => {
  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>RESERVAS ACTIVAS</h1>
          <p>Consulta tus reservas activas</p>
        </div>

        <div className='p-4 shadow-md rounded'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-1'>
              <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-semibold'>GARAJE DE JUAN</h2>
                <span className='line-clamp-1'>
                  Av. Directorio 3452, CABA, Argentina
                </span>
              </div>

              <MdOutlineMessage className='text-3xl' />
            </div>

            <div className='py-1 border-2 border-[#D58418] rounded-md text-center'>
              <span className='text-lg font-semibold'>Día - Horario</span>
            </div>

            <div className='flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2'>
              <span>CÓDIGO DE RESERVA:</span>
              <span>2548793</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
