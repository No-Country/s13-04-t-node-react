import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { useState } from 'react';
import AddParkingAddress from '../../components/createParking/AddParkingAddress';
import ParkingAvailability from '../../components/createParking/ParkingAvailability';
import ParkingSchedule from '../../components/createParking/ParkingSchedule';
import ParkingLotPhotos from '../../components/createParking/ParkingLotPhotos';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { garageService } from '../../services/garage';
import { useCurrentUser } from '../../hooks/auth';
interface ScheduleDay {
  end: string | null;
  start: string | null;
}
interface Schedule {
  [key: string]: {
    name: string;
    schedule: ScheduleDay[];
  };
}

export interface Inputs {
  [key: string]: string | File | boolean | Date | File[] | Schedule | number | Blob;
  idUser: string;
  name: string;
  address: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  capacity: number;
  price: number;
  whitConfirmation: boolean;
  coordinates: string;
  images: File[];
  type: string;
  schedule: Schedule;
}
export default function AddNewParking() {
  const user = useCurrentUser();
  const methods = useForm<Inputs>({
    defaultValues: {
      idUser: user.id,
      name: '',
      address: '',
      country: '',
      province: '',
      city: '',
      zipCode: '',
      capacity: 0,
      price: 0,
      whitConfirmation: false,
      coordinates: '',
      images: [],
      type: '',
      schedule: {
        '0': {
          name: "Domingo",
          schedule: []
        },
        '1': {
          name: "Lunes",
          schedule: []
        },
        '2': {
          name: "Martes",
          schedule: []
        },
        '3': {
          name: "Miércoles",
          schedule: []
        },
        '4': {
          name: "Jueves",
          schedule: []
        },
        '5': {
          name: "Viernes",
          schedule: []
        },
        '6': {
          name: "Sábado",
          schedule: []
        }
      }
    }
  });

  const { handleSubmit } = methods;
  const [step, setStep] = useState(0);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    for (const name in data) {
      if (name === 'schedule') {
        formData.append(name, JSON.stringify(data[name]));
      }
      else if (name === 'images' && data[name].length > 1) {
        data[name].forEach(file =>
          formData.append(name, file)
        );
      }
      else {
        formData.append(name, data[name] as string);
      }
    }
    garageService.createGaraje(formData);
  };
  return (
    <>
      <HeaderLogo />
      <main className='p-6 pb-10 relative'>
        <h1 className='uppercase text-xl font-normal'>
          AÑADIR ESTACIONAMIENTO
        </h1>
        <p className='mb-10'>Completa los datos de tu estacionamiento</p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 0 &&
              <AddParkingAddress setStep={setStep} />
            }
            {step === 1 &&
              <ParkingAvailability setStep={setStep} />
            }
            {step === 2 &&
              <ParkingSchedule setStep={setStep} />
            }
            {step === 3 &&
              <ParkingLotPhotos />
            }
          </form>
        </FormProvider>

      </main>
    </>
  );
}
