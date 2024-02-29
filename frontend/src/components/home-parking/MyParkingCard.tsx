import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { garageService } from '../../services/garage';
import { IGarage } from '../../types/garage';
import { useNavigate } from 'react-router-dom';
interface Props {
  parking: IGarage;
  index: number;
}
export const MyParkingCard = ({ parking, index }: Props) => {
  const navigation = useNavigate();
  const [enabled, setEnabled] = useState(parking.available);

  const setAvailable = async (status: boolean) => {
    await garageService.updateGarage(parking.id, {
      available: status,
    });
  };
  return (
    <>
      <img
        onClick={() => navigation(`/estacionamiento/${parking.id}`)}
        src={
          parking.images?.length
            ? parking.images[0].route
            : '/images/withoutImage.svg'
        }
        alt=''
        className='w-[70px] aspect-square border rounded-lg'
      />
      <div key={index} className='flex flex-col mr-auto ml-2'>
        <p className='text-xl'>{parking.name}</p>
        <p className='text-base font-light'>{parking.address}</p>
      </div>
      <Switch
        checked={enabled}
        onChange={(e) => {
          if (e) {
            setEnabled(true);
          } else {
            setEnabled(false);
          }
          setAvailable(e);
        }}
        className={`${
          enabled ? 'bg-[#5D2B2C]' : 'bg-[#5B5751]'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className='sr-only'>Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </>
  );
};
