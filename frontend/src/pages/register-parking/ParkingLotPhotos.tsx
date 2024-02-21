import { HeaderLogo } from '../../components/data-driver/HeaderLogo';

export default function ParkingLotPhotos() {
  return (
    <>
      <HeaderLogo />
      <div className='p-4'>
        <div className='flex items-center gap-2 pb-5'>
          <img src='/images/arrow-left.svg' alt='volver' />
          <span className='font-semibold'>Volver</span>
        </div>

        <h1 className='text-xl font-semibold'>AÑADIR ESTACIONAMIENTO</h1>
        <p className='pb-10'>Completa los datos de tu estacionamiento</p>
        <h4 className='text-lg font-semibold'>FOTO</h4>
        <p>Sube fotos de tu estacionamiento</p>

        <div className='flex items-center justify-center py-10'>
          <button type='button'>
            <img src='/images/add-photo.svg' alt='agregar' />
          </button>
        </div>

        <div className='flex items-center'>
          <img src='/images/add.svg' alt='agregar' />
          <span className='font-semibold'>Selecciona las imagenes</span>
        </div>

        <div className='flex flex-col gap-3 fixed bottom-6 inset-x-0 px-4'>
          <button
            type='submit'
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
          >
            Guardar
          </button>
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
}
