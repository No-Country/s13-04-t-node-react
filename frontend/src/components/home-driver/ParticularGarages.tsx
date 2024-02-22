import useSWR from 'swr';
import { garageService } from '../../services/garage';
import { CardGarage } from './CardGarage';

export const ParticularGarages = () => {
  const { data: garages } = useSWR(['particular-garages'], () =>
    garageService.list()
  );
  const filteredGarages = garages;

  return (
    <div className='px-4'>
      <h2 className='font-semibold pb-2 text-xl'>Particulares recomendados</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        {filteredGarages?.map((garage) => (
          <CardGarage key={garage.id} garage={garage} />
        ))}
      </ul>
    </div>
  );
};
