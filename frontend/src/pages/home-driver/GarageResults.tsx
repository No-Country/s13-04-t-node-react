import { HeaderUser } from '../../components/home-driver/HeaderUser';

export default function GarageResults() {
  return (
    <>
      <HeaderUser />
      <div className='px-4 py-10'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex items-center gap-4'>
            <img
              src='/images/image.png'
              alt='imagen'
              className='w-20 h-20 rounded-md'
            />

            <div className='flex flex-col'>
              <h4 className='font-semibold pb-1 line-clamp-1'>Nombre garaje</h4>
              <p>Descripción del garaje</p>
              <span className='font-semibold'>$0000 x hora</span>
            </div>
          </div>

          <span className='self-start p-1 bg-[#5D2B2C] text-white rounded-md'>
            0,0
          </span>
        </div>
      </div>
    </>
  );
}
