import { type SubmitHandler, useForm } from 'react-hook-form';
import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
interface Inputs {
  typeParking: string;
  nameParking: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export const AddNewParking = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <HeaderLogo />
      <main className='p-6'>
        <h1 className='uppercase text-xl font-normal'>
          AÑADIR ESTACIONAMIENTO
        </h1>
        <p>Completa los datos de tu estacionamiento</p>
        <form
          className='flex-col flex gap-3 text-sm mt-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className='flex-col flex mb-6'>
            Tipo de estacionamiento
            <Listbox
              value={
                watch('typeParking') ?? 'Selecciona el tipo de estacionamiento'
              }
              {...register('typeParking', { required: true })}
              onChange={(value: string) => {
                setValue('typeParking', value);
              }}
            >
              {({ open }) => (
                <>
                  <Listbox.Button className='border-[#D58418] border rounded-md py-1 px-3 placeholder:text-black mt-1 text-start'>
                    <span
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                      className='flex'
                    >
                      <p className='leading-loose'>
                        {watch('typeParking') ??
                          'Selecciona el tipo de estacionamiento'}
                      </p>
                      <img
                        className='ml-auto'
                        src={
                          open ? '/images/ArrowUp.svg' : '/images/ArrowDown.svg'
                        }
                        alt=''
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={isOpen}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Listbox.Options>
                      <div className='border-[#D58418] border rounded-md py-2 px-3 gap-1 flex flex-col'>
                        <Listbox.Option value='Particular' key='0'>
                          <p
                            className='py-3 flex align-middle'
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setValue('typeParking', 'Particular');
                            }}
                          >
                            Particular
                          </p>
                        </Listbox.Option>
                        <Listbox.Option value='Estacionamiento' key='1'>
                          <p
                            className='py-3 flex align-middle'
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setValue('typeParking', 'Estacionamiento');
                            }}
                          >
                            Estacionamiento
                          </p>
                        </Listbox.Option>
                      </div>
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
            {errors.typeParking != null && (
              <span className='text-red-500'>
                El tipo de estacionamiento es obligatorio
              </span>
            )}
          </label>
          <label className='flex-col flex mb-6'>
            Nombre del estacionamiento
            <input
              className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
              placeholder='Ingresa el nombre del estacionamiento'
              type='text'
              {...register('nameParking', { required: true })}
            />
            {errors.nameParking != null && (
              <span className='text-red-500'>
                El nombre del estacionamiento es obligatorio
              </span>
            )}
          </label>
          <section className='mt-10'>
            <h2 className='uppercase text-xl font-normal'>DIRECCIÓN</h2>
            <section className='flex flex-col gap-2'>
              <label className='flex-col flex mb-6'>
                País
                <input
                  className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                  placeholder='Ingresa el País'
                  type='text'
                  {...register('country', { required: true })}
                />
                {errors.nameParking != null && (
                  <span className='text-red-500'>El País es obligatorio</span>
                )}
              </label>
              <label className='flex-col flex mb-6'>
                Provincia/Estado/Departamento
                <input
                  className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                  placeholder='Ingresa la provincia, estado o departamento'
                  type='text'
                  {...register('state', { required: true })}
                />
                {errors.nameParking != null && (
                  <span className='text-red-500'>
                    La provincia es obligatoria
                  </span>
                )}
              </label>
              <label className='flex-col flex mb-6'>
                Ciudad
                <input
                  className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                  placeholder='Ingresa la Ciudad'
                  type='text'
                  {...register('city', { required: true })}
                />
                {errors.nameParking != null && (
                  <span className='text-red-500'>La ciudad es obligatoria</span>
                )}
              </label>
              <label className='flex-col flex mb-6'>
                Código postal
                <input
                  className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                  placeholder='Ingresa el código postal'
                  type='text'
                  {...register('postalCode', { required: true })}
                />
                {errors.nameParking != null && (
                  <span className='text-red-500'>
                    el código postal es obligatorio
                  </span>
                )}
              </label>
              <label className='flex-col flex mb-6'>
                Calle y numero
                <input
                  className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                  placeholder='Ingresa la calle y el número'
                  type='text'
                  {...register('address', { required: true })}
                />
                {errors.nameParking != null && (
                  <span className='text-red-500'>
                    La calle y el número son obligatorios
                  </span>
                )}
              </label>
            </section>
          </section>
          <button
            className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
            type='submit'
          >
            Siguiente
          </button>
          <button
            className='border rounded-3xl p-2 font-bold text-center'
            type='button'
          >
            cancelar
          </button>
        </form>
      </main>
    </>
  );
};
