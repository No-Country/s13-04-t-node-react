import { useEffect, useState } from 'react';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { BackArrowIcon } from '../../components/shared/BackArrowIcon';
import { useCurrentUser } from '../../hooks/auth';
import { garageService } from '../../services/garage';
import CustomButton from '../../components/utilities/CustomButton';
import { MyParkingCard } from '../../components/home-parking/MyParkingCard';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { IGarage } from '../../types/garage';
export const MyParkings = () => {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [MyParkingLots, setMyParkingLots] = useState([]);
  const resGarageData = async () => {
    const res = await garageService.getByUserId(user.id);
    return res.data.garages;
  };
  useEffect(() => {
    resGarageData().then((res) => {
      setMyParkingLots(res);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <HeaderUser />
      <main className='p-6 max-w-[600px] mx-auto w-full gap-6 flex flex-col'>
        <BackArrowIcon />
        <div>
          <h1 className='uppercase text-xl font-normal'>
            MIS ESTABLECIMIENTOS
          </h1>
          <p className=''>Gestiona tus cocheras</p>
        </div>
        {isLoading ? (
          <LoadingIcon width={40} />
        ) : (
          <div className='flex flex-col gap-2'>
            {MyParkingLots.map((parking: IGarage, index) => (
              <article
                key={`parking-card-${index}`}
                className='flex w-full h-auto border p-4 rounded-lg border-[#5D2B2C] items-center'
              >
                <MyParkingCard index={index} parking={parking} />
              </article>
            ))}
            {MyParkingLots.length === 0 && (
              <div>No tienes ningún estacionamiento creado</div>
            )}
          </div>
        )}

        <div className='w-full flex'>
          <CustomButton
            text='Añadir establecimiento'
            to='/estacionamiento'
            type='primary'
          />
        </div>
      </main>
    </>
  );
};
