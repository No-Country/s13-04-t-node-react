import useSWR from 'swr';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
// import { garageService } from '../../services/garage';
import { CardGarageResult } from '../../components/shared/CardGarageResult';
import { favoriteService } from '../../services/favorites';

export const FavoriteGaragesPage = () => {
  const { data: garages } = useSWR(['favorite-garages'], () =>
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

        {garages?.map((garage) => (
          <CardGarageResult
            images={garage.garage.images}
            key={garage.garage.id}
            id={garage.id}
            name={garage.garage.name}
            price={garage.garage.price}
          />
        ))}
      </div>
    </>
  );
};
