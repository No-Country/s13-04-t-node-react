import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { RiCloseLine } from 'react-icons/ri';

export const PendingReservations = () => {
  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>
            RESERVAS PENDIENTES
          </h1>
          <p>Revisa el estado de tus reservas</p>
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

              <span className='self-start px-3 py-3 bg-[#5D2B2C] text-white rounded-md'>
                0,0
              </span>
            </div>

            <div className='py-1 border-2 border-[#D58418] rounded-md text-center'>
              <span className='text-lg font-semibold'>Día - Horario</span>
            </div>

            <div className='flex items-center gap-1'>
              <RiCloseLine className='text-2xl text-[#5D2B2C] font-extrabold' />
              <span className='text-lg font-semibold'>Cancelar reserva</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};