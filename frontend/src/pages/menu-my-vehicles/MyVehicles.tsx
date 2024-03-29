import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '../../hooks/auth';
import { vehiculeService } from '../../services/vehicule';
import { Car } from '../../types/vehicule';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { Slide, toast } from 'react-toastify';


export const MyVehicles = () => {
  const [cars, setCars] = useState<Car[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const user = useCurrentUser()

  useEffect(() => {
    setLoading(true)
    vehiculeService.getByUserId(user.id)
      .then(res => {
        if (res.status === 200) {
          setCars(res.data.cars)
        }
        setLoading(false)
      }).catch(error => {
        console.error('Error fetching cars:', error);
        setLoading(false)
      });
  }, [user])

  const handleDeleteCar = (id: string) => {
    if(cars?.length === 1){
      toast.error('No puedes borrar todos tus autos!',
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    }else{
      vehiculeService.deleteCar(id)
      setCars(prevCars => prevCars?.filter(car => car.id !== id));
    }
  }

  return (
    <>
      <HeaderUser />
      <div className='px-4 py-10'>
        <div className='pb-8'>
          <h1 className='font-semibold text-2xl'>MIS VEHICULOS</h1>
          <span>Gestioná tus vehículos</span>
        </div>

        <div className='flex flex-col gap-3'>
          
          {loading ? 
            <div className='mt-3'><img src='/images/Loading.svg' width={36} height={36} className='animate-spin m-auto' /></div>
          :
            <div>
              {cars?.length ? cars.map(car => (
                <div key={car.id} className='p-4 border border-[#5D2B2C] rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <img src='/images/vehicle.svg' alt='vehiculo' />
                      <span className='uppercase text-2xl'>{car.plate}</span>
                    </div>
                    <button onClick={() => handleDeleteCar(car.id)}>
                      <img src='/images/trash.svg' alt='bote' />
                    </button>
                  </div>
                </div>
              )) :
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <span className='uppercase text-xl'>Añade un vehículo para verlo en la lista</span>
                  </div>
                </div>
            }
            </div>
          }

          <Link
            to='/agregar-vehiculo'
            className='flex flex-col fixed bottom-10 inset-x-0 px-4'
          >
            <button
              type='button'
              className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
            >
              Añadir vehículo
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
