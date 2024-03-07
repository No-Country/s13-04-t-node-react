import useSWR from 'swr';
import { garageService } from '../../services/garage';
import { CardGarage } from './CardGarage';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoadingIcon } from '../shared/LoadingIcon';

export const ParticularGarages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: garages } = useSWR(['particular-garages'], () =>
    garageService.listRecomended()
  );
  //filtrar solo garajes con rating
  const filteredGarages = garages;
  useEffect(() => {
    filteredGarages && setIsLoading(false);
  }, [filteredGarages]);
  return (
    <div>
      <h2 className='font-semibold pb-2 text-xl'>Garajes recomendados</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4 min-h-[100px]'>
        {isLoading && <LoadingIcon width={50} />}
        {!isLoading &&
          filteredGarages?.map((garage) => (
            <Link key={garage.id} to={`/reservar/${garage.id}`}>
              <CardGarage garage={garage} />
            </Link>
          ))}
      </ul>
    </div>
  );
};
