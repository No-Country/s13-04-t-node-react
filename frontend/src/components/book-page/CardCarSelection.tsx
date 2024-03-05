import clsx from 'clsx';
import { ICar } from '../../types/vehicule';
import useSWR from 'swr';
import { vehiculeService } from '../../services/vehicule';
import { useCurrentUser } from '../../hooks/auth';

interface Props {
  selectedCar: ICar | undefined;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar | undefined>>;
}

export const CardCarSelection = ({ setSelectedCar, selectedCar }: Props) => {
  const user = useCurrentUser();
  const { data } = useSWR('cars', () => vehiculeService.getByUserId(user.id));
  const cars: ICar[] = data?.data.cars ?? [];
  return (
    <div className='pt-5'>
      <div className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        {cars?.map((car) => (
          <button
            key={car.id}
            type='button'
            onClick={() => setSelectedCar(car)}
            className={clsx(
              'p-4 rounded-lg',
              car.id === selectedCar?.id && 'bg-[#D58418]'
            )}
          >
            <div className='flex flex-col items-center justify-center w-28'>
              <img src='/images/car.svg' alt='auto' className='p-2' />
              <h1 className='text-xl font-semibold uppercase'>{car.plate}</h1>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
