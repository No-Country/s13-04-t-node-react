import { CardGaraje } from '../components/CardGaraje';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className='px-4 py-8'>
        <h1 className='uppercase text-2xl pb-8'>¡HOLA, USUARIO!</h1>
        <form className='flex flex-col gap-3'>
          <div className='relative'>
            <img
              src='/images/search.svg'
              alt='search'
              className='absolute top-2 left-4'
            />
            <input
              type='text'
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
              placeholder='¿Dónde querés estacionar?'
            />
          </div>

          <div className='relative'>
            <img
              src='/images/calendario.svg'
              alt='calendario'
              className='absolute left-2'
            />
            <input
              type='text'
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
              placeholder='¿Cuándo querés estacionar?'
            />
          </div>

          <div className='relative'>
            <img
              src='/images/calendarioV2.svg'
              alt='calendario'
              className='absolute left-2'
            />
            <input
              type='text'
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
              placeholder='¿Hasta cuándo querés estacionar?'
            />
          </div>

          <input
            type='submit'
            className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center'
            value='Buscar'
          />
        </form>
      </div>

      <div className='px-4 pb-6'>
        <h2 className='font-semibold pb-2 text-xl'>
          Estacionamientos favoritos
        </h2>
        <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
          <CardGaraje />
          <CardGaraje />
          <CardGaraje />
        </ul>
      </div>

      <div className='px-4'>
        <h2 className='font-semibold pb-2 text-xl'>
          Particulares recomendados
        </h2>
        <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
          <CardGaraje />
          <CardGaraje />
          <CardGaraje />
        </ul>
      </div>

      <div className='px-4 pt-8'>
        <div className='flex justify-between gap-10 bg-[#D9D9D9] px-8 py-2 rounded-md'>
          <img src='/images/location.svg' alt='localizacion' />
          <div>
            <h4 className='text-xl font-semibold'>Ver mapa</h4>
            <p>Ubica los estacionamientos cercanos</p>
          </div>
        </div>
      </div>
    </>
  );
}
