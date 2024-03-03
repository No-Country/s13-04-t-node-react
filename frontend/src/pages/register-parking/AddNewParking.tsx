import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { useEffect, useState } from 'react';
import AddParkingAddress from '../../components/createParking/AddParkingAddress';
import ParkingAvailability from '../../components/createParking/ParkingAvailability';
import ParkingSchedule from '../../components/createParking/ParkingSchedule';
import ParkingLotPhotos from '../../components/createParking/ParkingLotPhotos';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { garageService } from '../../services/garage';
import { useCurrentUser } from '../../hooks/auth';
import { useNavigate } from 'react-router';
import { CreateGaraje } from '../../types/garage';

const INITIAL_VALUES = (userId: string) => {
  return {
    idUser: userId,
    name: '',
    address: '',
    country: '',
    province: '',
    city: '',
    zipCode: '',
    capacity: '',
    price: '',
    whitConfirmation: false,
    coordinates: '',
    images: [],
    type: null,
    schedule: {
      0: {
        name: 'Domingo',
        schedule: [],
      },
      1: {
        name: 'Lunes',
        schedule: [],
      },
      2: {
        name: 'Martes',
        schedule: [],
      },
      3: {
        name: 'Miércoles',
        schedule: [],
      },
      4: {
        name: 'Jueves',
        schedule: [],
      },
      5: {
        name: 'Viernes',
        schedule: [],
      },
      6: {
        name: 'Sábado',
        schedule: [],
      },
    },
  };
};
export const AddNewParking = () => {
  const navigation = useNavigate();
  const user = useCurrentUser();
  const methods = useForm<CreateGaraje>({
    defaultValues: INITIAL_VALUES(user.id),
  });
  const { handleSubmit } = methods;
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<CreateGaraje> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const name in data) {
      if (name === 'schedule') {
        formData.append(name, JSON.stringify(data[name]));
      } else if (name === 'images' && data[name].length > 1) {
        data[name].forEach((file) => {
          formData.append(name, file);
        });
      } else {
        formData.append(name, data[name] as string);
      }
    }

    const resGarageData = await garageService.getByUserId(user.id);

    if (resGarageData.status === 200) {
      const resCreateGarage = await garageService.createGaraje(formData);
      if (resGarageData.data.garages.length > 0) {
        if (resCreateGarage.status === 200) {
          navigation('/');
        } else {
          console.log(resCreateGarage.data);
        }
      } else if (resGarageData.data.garages.length === 0) {
        if (resCreateGarage.status === 200) {
          navigation('/cuenta-creada');
        }
      }
      setIsLoading(false);
    } else {
      console.log(resGarageData.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  return (
    <>
      <HeaderLogo />
      <main className='px-6 pb-10 relative pt-3 flex flex-col max-w-[100vw]'>
        {step > 0 && (
          <button
            onClick={() => {
              setStep(step - 1);
            }}
          >
            <div className='flex items-center text-black py-2 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 mr-2 transform rotate-0'
                viewBox='0 0 19 16'
                fill='none'
              >
                <path
                  fill='#5D2B2C'
                  d='M4.8417 9.43499L9.00314 13.5964C9.26622 13.8595 9.39776 14.1943 9.39776 14.6009C9.39776 15.0075 9.26622 15.3423 9.00314 15.6054C8.74006 15.8685 8.40523 16 7.99865 16C7.59208 16 7.25725 15.8685 6.99417 15.6054L0.393272 9.0045C0.249774 8.861 0.147891 8.70555 0.0876217 8.53813C0.0273527 8.37072 -0.001825 8.19135 8.83068e-05 8.00001C8.83068e-05 7.80868 0.0302228 7.62931 0.0904918 7.4619C0.150761 7.29448 0.251688 7.13903 0.393272 6.99553L6.99417 0.394634C7.25725 0.131554 7.59208 1.52588e-05 7.99865 1.52588e-05C8.40523 1.52588e-05 8.74006 0.131554 9.00314 0.394634C9.26622 0.657713 9.39776 0.992541 9.39776 1.39912C9.39776 1.8057 9.26622 2.14052 9.00314 2.4036L4.8417 6.56504H17.3333C17.7399 6.56504 18.081 6.7028 18.3565 6.97831C18.632 7.25383 18.7693 7.59439 18.7683 8.00001C18.7683 8.40659 18.6306 8.74764 18.355 9.02315C18.0795 9.29867 17.739 9.43595 17.3333 9.43499H4.8417Z'
                />
              </svg>
              <span className='font-roboto-condensed text-base font-medium'>
                Volver
              </span>
            </div>
          </button>
        )}
        <h1 className='uppercase text-xl font-normal'>
          AÑADIR ESTACIONAMIENTO
        </h1>
        <p className='mb-10'>Completa los datos de tu estacionamiento</p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-[600px] m-auto w-full'
          >
            {step === 0 && <AddParkingAddress setStep={setStep} />}
            {step === 1 && <ParkingAvailability setStep={setStep} />}
            {step === 2 && <ParkingSchedule setStep={setStep} />}
            {step === 3 && (
              <ParkingLotPhotos setStep={setStep} isLoading={isLoading} />
            )}
          </form>
        </FormProvider>
      </main>
    </>
  );
};
