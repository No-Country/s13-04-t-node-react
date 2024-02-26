import useSWR from 'swr';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { garageService } from '../../services/garage';
import { CardGarageResult } from '../../components/shared/CardGarageResult';

export const FavoriteGaragesPage = () => {
  const { data: garages } = useSWR(['favorite-garages'], () =>
    garageService.list()
  );
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
            key={garage.id}
            id={garage.id}
            name={garage.name}
            price={garage.price}
          />
        ))}
      </div>
    </>
  );
};
