import { HeaderLogo } from '../components/HeaderLogo';

export const DriverEmail = () => {
  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-10'>
        <h1 className='font-semibold text-2xl uppercase pb-8'>Email</h1>

        <div className='w-full'>
          <div className='flex flex-col'>
            <label className='pb-2'>E-mail</label>
            <input
              type='text'
              className='px-4 py-2 border border-[#D58418] rounded outline-none'
              placeholder='Ingresa tu nuevo e-mail'
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
