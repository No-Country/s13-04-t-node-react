import { Link } from 'react-router-dom';
import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '../../hooks/auth';
import { vehiculeService } from '../../services/vehicule';
import { Car } from '../../types/vehicule';


export const MyVehicles = () => {
  const [cars, setCars] = useState<Car[]>()
  const user = useCurrentUser()

  useEffect(() => {
    vehiculeService.getByUserId(user.id)
      .then(res => {
        if (res.status === 200) {
          setCars(res.data.cars)
        }
      }).catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, [user])

  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-10'>
        <div className='pb-8'>
          <h1 className='font-semibold text-2xl'>MIS VEHICULOS</h1>
          <span>Gestioná tus vehículos</span>
        </div>


        <div className='flex flex-col gap-3'>
          {cars && cars.map(car => (
            <div key={car.id} className='p-4 border border-[#5D2B2C] rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <img src='/images/vehicle.svg' alt='vehiculo' />
                  <span className='uppercase text-2xl'>{car.plate}</span>
                </div>
                <img src='/images/trash.svg' alt='bote' />
              </div>
            </div>
          ))}

          {/* <div className='p-4 border border-[#5D2B2C] rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <img src='/images/vehicle.svg' alt='vehiculo' />
                <span className='uppercase text-2xl'>{cars && cars[0].plate} </span>
              </div>
              <img src='/images/trash.svg' alt='bote' />
            </div>
          </div> */}

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
