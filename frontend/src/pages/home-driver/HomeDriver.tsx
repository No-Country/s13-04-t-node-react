import { useCurrentUser } from '../../hooks/auth';

import { FavoriteGarages } from '../../components/home-driver/FavoriteGarages';
import { ParticularGarages } from '../../components/home-driver/ParticularGarages';
import { FormSearch } from '../../components/home-driver/FormSearch';

export const HomeDriver = () => {
  const user = useCurrentUser();

  return (
    <>
      <div className='p-4'>
        <h1 className='uppercase text-2xl pb-8'>¡HOLA, {user.name}!</h1>

        <FormSearch
          initialValues={{
            place: '',
            startDate: null,
            endDate: null,
          }}
        />

        <FavoriteGarages />
        <ParticularGarages />

        <div className='pt-8'>
          <div className='flex justify-between gap-10 bg-[#D9D9D9] px-8 py-2 rounded-md'>
            <img src='/images/location.svg' alt='localizacion' />
            <div>
              <h4 className='text-xl font-semibold'>Ver mapa</h4>
              <p>Ubica los estacionamientos cercanos</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
