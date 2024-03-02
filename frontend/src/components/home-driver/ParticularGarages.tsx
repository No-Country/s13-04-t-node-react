import useSWR from 'swr';
import { garageService } from '../../services/garage';
import { CardGarage } from './CardGarage';
import { Link } from 'react-router-dom';

export const ParticularGarages = () => {
  const { data: garages } = useSWR(['particular-garages'], () =>
    garageService.list()
  );
  const filteredGarages = garages;

  return (
    <div>
      <h2 className='font-semibold pb-2 text-xl'>Particulares recomendados</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        {filteredGarages?.map((garage) => (
          <Link key={garage.id} to={`/reservar/${garage.id}`}>
            <CardGarage garage={garage} />
          </Link>
        ))}
      </ul>
    </div>
  );
};
