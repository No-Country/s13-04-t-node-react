import useSWR from 'swr';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { CardGarageResult } from '../../components/shared/CardGarageResult';
import { favoriteService } from '../../services/favorites';

export const FavoriteGaragesPage = () => {
  const { data: favorites } = useSWR(['favorite-garages'], () =>
    favoriteService.list()
  );
  // console.log(garages)
  return (
    <>
      <HeaderUser />
      <div className='p-4'>
        <BackArrowIcon />
        <div className='flex flex-col gap-1 py-6'>
          <h1 className='text-2xl font-semibold uppercase'>FAVORITOS</h1>
          <p>Administra tus estacionamientos favoritos</p>
        </div>

        {favorites?.map(({ garage }) => (
          <CardGarageResult
            images={garage.images}
            key={garage.id}
            id={garage.id}
            name={garage.name}
            price={garage.price}
            rating={garage.rating}
            address ={garage.address}
          />
        ))}
      </div>
    </>
  );
};
