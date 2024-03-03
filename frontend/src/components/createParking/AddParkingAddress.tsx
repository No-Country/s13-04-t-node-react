import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { geolocationService } from '../../services/geolocation';
import ModalMapConfirm from './ModalMapConfirm';
import { CreateGaraje } from '../../types/garage';
import { useNavigate } from 'react-router-dom';
interface Coordinates {
  lat: number;
  lng: number;
}

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddParkingAddress({ setStep }: Props) {
  const navigate = useNavigate();
  const {
    getValues,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [openModal, setOpenModal] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const next = async () => {
    const data: Partial<CreateGaraje> = {
      address: getValues('address'),
      city: getValues('city'),
      province: getValues('province'),
      country: getValues('country'),
    };
    const res = await geolocationService.getCoordinates(data);
    setCoordinates(res.results[0].geometry.location);
    if (res.status === 'OK') {
      setOpenModal(true);
    }
  };
  return (
    <>
      <section className='flex-col flex gap-3 text-sm mt-10'>
        <label className='flex-col flex mb-6'>
          Tipo de estacionamiento
          <Listbox
            value={watch('type') ?? 'Selecciona el tipo de estacionamiento'}
            {...register('type', { required: true })}
            onChange={(value: string) => {
              setValue('type', value);
            }}
          >
            {({ open }) => (
              <>
                <Listbox.Button className='border-[#D58418] border rounded-md py-1 px-3 placeholder:text-black mt-1 text-start'>
                  <span
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className='flex '
                  >
                    <p className='leading-loose'>
                      {watch('type') ?? 'Selecciona el tipo de estacionamiento'}
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
                            setValue('type', 'Particular');
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
                            setValue('type', 'Estacionamiento');
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
          {errors.type != null && (
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
            {...register('name', { required: true })}
          />
          {errors.name != null && (
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
              {errors.country != null && (
                <span className='text-red-500'>El País es obligatorio</span>
              )}
            </label>
            <label className='flex-col flex mb-6'>
              Provincia/Estado/Departamento
              <input
                className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                placeholder='Ingresa la provincia, estado o departamento'
                type='text'
                {...register('province', { required: true })}
              />
              {errors.province != null && (
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
              {errors.city != null && (
                <span className='text-red-500'>La ciudad es obligatoria</span>
              )}
            </label>
            <label className='flex-col flex mb-6'>
              Código postal
              <input
                className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1 outline-none'
                placeholder='Ingresa el código postal'
                type='text'
                {...register('zipCode', { required: true })}
              />
              {errors.zipCode != null && (
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
              {errors.address != null && (
                <span className='text-red-500'>
                  La calle y el número son obligatorios
                </span>
              )}
            </label>
          </section>
        </section>
        <button
          className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
          type='button'
          onClick={handleSubmit(next)}
        >
          Siguiente
        </button>
        <button
          className='border border-[#D58418]  rounded-3xl p-2 font-bold text-center w-full my-4 max-w-[600px] mx-auto'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            navigate('/mis-estacionamientos');
          }}
        >
          cancelar
        </button>
      </section>
      {openModal && (
        <ModalMapConfirm
          coordinates={coordinates}
          setOpenModal={setOpenModal}
          setStep={setStep}
        />
      )}
    </>
  );
}
