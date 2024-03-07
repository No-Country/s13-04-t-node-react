import useSWR from 'swr';
import { CardGarage } from './CardGarage';
import { Link } from 'react-router-dom';
import { favoriteService } from '../../services/favorites';
import { useEffect, useState } from 'react';
import { LoadingIcon } from '../shared/LoadingIcon';

export const FavoriteGarages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: favorites } = useSWR(['favorite-garages'], () =>
    favoriteService.list()
  );
  const filteredGarages = favorites;
  useEffect(() => {
    filteredGarages && setIsLoading(false);
  }, [filteredGarages]);
  return (
    <div className='pb-6'>
      <h2 className='font-semibold pb-2 text-xl'>Estacionamientos favoritos</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4 min-h-[100px]'>
        {isLoading && <LoadingIcon width={50} />}

        {!isLoading &&
          filteredGarages?.map((favorite) => (
            <Link key={favorite.id} to={`/reservar/${favorite.garage.id}`}>
              <CardGarage garage={favorite.garage} />
            </Link>
          ))}
      </ul>
    </div>
  );
};
