import { Link } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { MdOutlineMessage } from 'react-icons/md';

export const CashPaymentPage = () => {
  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>
            ¡RESERVA CONFIRMADA!
          </h1>
          <p>Tu reserva ha sido confirmada</p>
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

            <div className='flex items-center justify-between gap-2'>
              <div className='p-3 bg-[#D58418] rounded-md text-center w-full font-semibold'>
                <span>
                  Lunes <br /> 19 de febrero
                </span>
              </div>
              <div className='p-3 border border-[#D58418] bg-white rounded-md text-center w-full font-semibold'>
                <div className='grid grid-cols-2 gap-1'>
                  <div className='flex flex-col gap-1 items-start'>
                    <p>Inicio</p>
                    <p>Fin</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>17:00</p>
                    <p>19:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2'>
              <span>CÓDIGO DE RESERVA:</span>
              <span>2548793</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 flex flex-col sticky bottom-0 inset-x-0 mt-auto bg-white'>
        <Link to='/reserva-rechazada'>
          <button
            type='submit'
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold w-full'
          >
            Guardar
          </button>
        </Link>
      </div>
    </>
  );
};
