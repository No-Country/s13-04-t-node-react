import { CardCarSelection } from '../../components/book-page/CardCarSelection';
import { HeaderUser } from '../../components/home-driver/HeaderUser';
// import { BiSolidUpArrow } from 'react-icons/bi';
import { SelectReservationDay } from '../../components/book-page/SelectReservationDay';
import { SelectStartTime } from '../../components/book-page/SelectStartTime';
import { SelectEndTime } from '../../components/book-page/SelectEndTime';
import { Link } from 'react-router-dom';

export const CarDateReservation = () => {
  return (
    <>
      <HeaderUser />

      <div className='flex-1 flex flex-col'>
        <div className='p-4'>
          <h1 className='text-xl font-semibold uppercase pb-2'>
            GARAJE DE JUAN
          </h1>
          <p>Selecciona el vehículo con el que vas a estacionar</p>
          <CardCarSelection />
        </div>

        <form className='flex flex-1 flex-col gap-4'>
          <div className='px-4 grid gap-4'>
            <SelectReservationDay />
            <SelectStartTime />
            <SelectEndTime />
          </div>

          <div className='p-4 flex flex-col gap-3 sticky bottom-0 inset-x-0 mt-auto bg-white'>
            <Link
              to='/reserva-rechazada'
              type='submit'
              className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
            >
              Guardar
            </Link>
            <button
              type='button'
              className='py-2 text-center bg-white border border-[#D58418] rounded-3xl font-semibold'
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
