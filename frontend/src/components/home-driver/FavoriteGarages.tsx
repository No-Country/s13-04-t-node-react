import useSWR from 'swr';
import { CardGarage } from './CardGarage';
import { Link } from 'react-router-dom';
import { favoriteService } from '../../services/favorites';

export const FavoriteGarages = () => {
  const { data: favorites } = useSWR(['favorite-garages'], () =>
    favoriteService.list()
  );
  const filteredGarages = favorites;

  return (
    <div className='pb-6'>
      <h2 className='font-semibold pb-2 text-xl'>Estacionamientos favoritos</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        {filteredGarages?.map((favorite) => (
          <Link key={favorite.id} to={`/reservar/${favorite.garage.id}`}>
            <CardGarage garage={favorite.garage} />
          </Link>
        ))}
      </ul>
    </div>
  );
};
