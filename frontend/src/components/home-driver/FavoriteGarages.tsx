import useSWR from 'swr';
import { CardGarage } from './CardGarage';
import { Link } from 'react-router-dom';
import { favoriteService } from '../../services/favorites';

export const FavoriteGarages = () => {
  const { data: garages } = useSWR(['favorite-garages'], () =>
    favoriteService.list()
  );
  const filteredGarages = garages;

  return (
    <div className='pb-6'>
      <h2 className='font-semibold pb-2 text-xl'>Estacionamientos favoritos</h2>
      <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        {filteredGarages?.map((garage) => (
          <Link key={garage.id} to={`/reservar/${garage.garage.id}`}>
            <CardGarage garage={garage.garage} />
          </Link>
        ))}
      </ul>
    </div>
  );
};
