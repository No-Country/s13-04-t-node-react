import { Link } from 'react-router-dom';
import { HeaderLogo } from '../../components/data-driver/HeaderLogo';

export const PaymentPage = () => {
  return (
    <>
      <HeaderLogo />
      <div className='p-4'>
        <h1 className='text-2xl font-semibold uppercase'>GARAJE DE JUAN</h1>
        <span className='font-semibold text-lg'>Pago</span>
        <div className='flex items-center justify-between py-6 text-lg'>
          <span>Total a abonar:</span>
          <span className='font-semibold'>$2000</span>
        </div>

        <p>Seleccionar método de pago</p>

        <div className='grid grid-cols-2 items-center justify-between pt-4 gap-4'>
          <div className='flex items-center justify-center border border-[#0A0080] rounded-md p-2 w-full hover:bg-[#00BCFF]'>
            <img src='/images/payment.svg' alt='mercado-pago' />
          </div>
          <div className='flex items-center justify-center border border-black rounded-md p-2 w-full font-semibold hover:bg-[#D58418]'>
            Efectivo
          </div>
        </div>

        {/* ES DINAMICO LAS FRASES SEGUN SELECCIONE LOS METODOS SI ES CON MERCADO PAGO O EFECTIVO */}
        <div className='flex flex-col gap-4 py-10'>
          <span>
            ES DINAMICO LAS FRASES SEGUN SELECCIONE LOS METODOS SI ES CON
            MERCADO PAGO O EFECTIVO
          </span>
          <span>
            *** Serás redirigido a la página de Mercado Pago para que puedas
            abonar la reserva ***
          </span>
          <span>*** Abonaras en efectivo al momento de estacionar ***</span>
        </div>

        <div className='flex flex-col gap-3 fixed bottom-10 inset-x-0 px-4'>
          <Link to='/efectivo-pago'>
            <button
              type='submit'
              className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold w-full'
            >
              Confirmar
            </button>
          </Link>

          <button
            type='button'
            className='py-2 text-center bg-white border border-[#D58418] rounded-3xl font-semibold'
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
