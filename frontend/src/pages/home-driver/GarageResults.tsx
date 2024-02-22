import { useSearchParams } from 'react-router-dom';
import { HeaderUser } from '../../components/home-driver/HeaderUser';

import { garageService } from '../../services/garage';
import useSWR from 'swr';
import { CardGarageResult } from '../../components/home-driver/CardGarageResult';

export default function GarageResults() {
  const [searchParams] = useSearchParams();

  const place = searchParams.get('place') ?? '';
  const startDate = searchParams.get('start-date') ?? '';
  const endDate = searchParams.get('end-date') ?? '';

  const { data: garages } = useSWR(
    ['search-garages', place, startDate, endDate],
    () =>
      garageService.search({
        location: place,
        startDate: startDate,
        endDate: endDate,
      })
  );

  return (
    <>
      <HeaderUser />
      <div className='px-4 py-10'>
        <p>place: {place}</p>
        <p>startDate: {startDate}</p>
        <p>endDate: {endDate}</p>

        {garages?.map((garage) => (
          <CardGarageResult key={garage.id} garage={garage} />
        ))}
      </div>

      <div className='flex flex-col fixed bottom-6 inset-x-0 px-4'>
        <div className='flex justify-between gap-6 bg-[#FFE9CC] px-8 py-2 rounded-md'>
          <img src='/images/location.svg' alt='localizacion' />
          <div>
            <h4 className='text-xl font-semibold'>Ver mapa</h4>
            <p>Ubica los estacionamientos cercanos</p>
          </div>
        </div>
      </div>
    </>
  );
}
