import { useFormContext } from 'react-hook-form';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
export default function ParkingAvailability({ setStep }: Props): JSX.Element {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const next = () => {
    setStep(2);
  };

  return (
    <>
      <main className=''>
        <section className='flex-col flex gap-3 text-sm mt-10'>
          <label className='flex-col flex mb-4 mt-8'>
            Cantidad de plazas disponibles
            <input
              className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
              placeholder='Ingresa la cantidad de lugares'
              type='text'
              id='capacity'
              {...register('capacity', { required: true })}
            />
            {errors.capacity != null && (
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
          <div>
            <input
              defaultChecked={false}
              type='checkbox'
              id='notificationYes'
              onChange={(e) => {
                setValue('whitConfirmation', e.target.checked);
              }}
              className='mr-2'
            />
            <label htmlFor='notificationYes'>
              Deseo recibir una notificación cuando un conductor reserve en mi
              estacionamiento para poder confirmar o rechazar la misma.
            </label>
          </div>
          <button
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-8'
            style={{ height: '40px', gap: '4px' }}
            onClick={handleSubmit(next)}
          >
            Siguiente
          </button>
          <button
            className='border border-[#D58418]  rounded-3xl p-2 font-bold text-center w-full my-4 max-w-[600px] mx-auto'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setStep(0);
            }}
          >
            cancelar
          </button>
        </section>
      </main>
    </>
  );
}
