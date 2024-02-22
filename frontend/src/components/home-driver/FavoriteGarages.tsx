import useSWR from 'swr';
import { garageService } from '../../services/garage';
import { CardGarage } from './CardGarage';

export const FavoriteGarages = () => {
  const { data: garages } = useSWR(['favorite-garages'], () =>
    garageService.list()
  );
  const filteredGarages = garages;

  return (
    <div className='px-4 pb-6'>
      <h2 className='font-semibold pb-2 text-xl'>Estacionamientos favoritos</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        {filteredGarages?.map((garage) => (
          <CardGarage key={garage.id} garage={garage} />
        ))}
      </ul>
    </div>
  );
};
