import { HeaderClosedDriver } from '../components/HeaderClosedDriver';

export const DriverPhone = () => {
  return (
    <>
      <HeaderClosedDriver />
      <div className='px-4 py-10'>
        <h1 className='font-semibold text-2xl uppercase pb-8'>Celular</h1>

        <div className='w-full'>
          <div className='flex flex-col'>
            <label className='pb-2'>Celular</label>
            <input
              type='text'
              className='px-4 py-2 border border-[#D58418] rounded'
              placeholder='Ingresa tu nuevo número de celular'
            />
          </div>

          <div className='flex flex-col gap-3 fixed bottom-10 inset-x-0 px-4'>
            <button
              type='button'
              className='py-2 text-center bg-[#D58418] rounded-lg font-semibold'
            >
              Guardar
            </button>
            <button
              type='button'
              className='py-2 text-center bg-white border border-[#D58418] rounded-lg font-semibold'
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
