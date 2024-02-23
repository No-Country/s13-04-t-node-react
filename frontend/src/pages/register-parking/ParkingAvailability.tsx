import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { HeaderLanding } from '../../components/landing/HeaderLanding';

interface Inputs {
  abailavility: string; // revisar nombre en back
  price: string; // revisar nombre en back
}

export const ParkingAvailability = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <>
      <HeaderLanding />
      <main className='px-4 py-10'>
        {/* Titulos de la pantalla */}
        <h1 className='uppercase text-xl font-normal'>
          AÑADIR ESTACIONAMIENTO
        </h1>
        <p>Completa los datos de tu estacionamiento</p>

        {/* Inputs de la pantalla */}
        <form
          className='flex-col flex gap-3 text-sm mt-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className='flex-col flex mb-4 mt-8'>
            Cantidad de plazas disponibles
            <input
              className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
              placeholder='Ingresa la cantidad de lugares'
              type='text'
              id='abailavility'
              {...register('abailavility', { required: true })}
            />
            {errors.abailavility != null && (
              <span className='text-red-500'>
                La cantidad de lugares es obligatoria
              </span>
            )}
          </label>

          <label className='flex-col flex mb-4 mt-8'>
            Valor hora
            <input
              className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
              placeholder='Ingresa el valor de la hora de estacionamiento'
              type='text'
              id='price'
              {...register('price', { required: true })}
            />
            {errors.price != null && (
              <span className='text-red-500'>
                El valor de la hora de estacionamiento es obligatoria
              </span>
            )}
          </label>

          {/* Confirmacion de reservas */}
          <div>
            <input
              type='radio'
              id='notificationYes'
              value='yes'
              // checked={notificationPreference === 'yes'}
              // onChange={() => setNotificationPreference('yes')}
              className='mr-2'
            />
            <label htmlFor='notificationYes'>
              Deseo recibir una notificación cuando un conductor reserve en mi
              estacionamiento para poder confirmar o rechazar la misma.
            </label>
          </div>

          {/* Botones de acción */}

          <button
            type='submit'
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-8 '
            style={{ height: '40px', gap: '4px' }}
          >
            Siguiente
          </button>

          <Link to='*'>
            <button
              type='button'
              className='text-center text-black border border-[#D58418] px-16 font-normal  w-full rounded-3xl'
              style={{ height: '40px', padding: '8px 16px', gap: '4px' }}
            >
              Cancelar
            </button>
          </Link>
        </form>
      </main>
    </>
  );
};
