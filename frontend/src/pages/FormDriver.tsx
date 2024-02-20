import { HeaderLogo } from '../components/HeaderLogo';

export const FormDriver = () => {
  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-10'>
        <div className='pb-8'>
          <h1 className='font-semibold text-2xl uppercase'>AÑADIR VEHÍCULO</h1>
          <span>Completa los datos de tu vehículo</span>
        </div>

        <div className='w-full'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <label className='pb-2'>Patente</label>
              <input
                type='text'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Ingresa la patente de tu auto'
              />
            </div>

            <div className='flex flex-col'>
              <label className='pb-2'>Marca</label>
              <input
                type='text'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Ingresa la marca de tu auto'
              />
            </div>

            <div className='flex flex-col'>
              <label className='pb-2'>Modelo</label>
              <input
                type='text'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Ingresa el modelo de tu auto'
              />
            </div>

            <div className='flex flex-col'>
              <label className='pb-2'>Color</label>
              <input
                type='text'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Ingresa el color de tu auto'
              />
            </div>
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
