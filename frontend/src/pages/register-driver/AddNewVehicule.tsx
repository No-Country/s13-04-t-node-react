import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/auth';
import { vehiculeService } from '../../services/vehicule';
import { HeaderLanding } from '../../components/landing/HeaderLanding';

export const AddNewVehicule = () => {
  const user = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //const onSubmit: SubmitHandler<Inputs> = (data) => { sendData.current(data) };
  const navigate = useNavigate();

  const sendData = handleSubmit(async (data) => {
    console.log(data);
    const vehicule = {
      idUser: user.id,
      brand: data.brand,
      model: data.model,
      plate: data.plate,
      color: data.color,
    };
    try {
      const res = await vehiculeService.addVehicule(vehicule);
      if (res.status === 201) {
        navigate('/cuenta-creada');
      } else {
        console.log(res);
      }
    } catch (error) {
      alert('Hay algun error con los datos suministrados');
    }
  });

  //  const sendData = handleSubmit(async (data) => {
  //   console.log('hola')
  //   const vehiculo = {
  //     idUser: "d35d86fd-cc4f-4fe8-a79c-73477ab5f359",
  //     brand: "Toyota",
  //     model: "Corolla",
  //     plate: "ABC123",
  //     color: "Rojo"
  //   };
  //   const peticion = await axios.post('https://estacionar.azurewebsites.net/api/cars', vehiculo  )
  //   console.log(peticion.data)
  //   });

  console.log(errors);
  return (
    <>
      <HeaderLanding />
      <main className='px-4 py-10'>
        {/* Titulos de la pantalla */}
        <h1 className='font-semibold text-2xl uppercase'>AÑADIR VEHÍCULO</h1>
        <p>Completa los datos de tu vehículo</p>

        <form className='flex-col flex gap-4 mb-4' onSubmit={sendData}>
          {/* Campos a llenar */}
          <section>
            <label className='flex-col flex mb-4 mt-8'>
              Patente
              <input
                className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
                placeholder='Ingresa la patente de tu auto'
                type='text'
                id='plate'
                {...register('plate', { required: true })}
              />
              {errors.plate != null && (
                <span className='text-red-500'>
                  La patente del auto es obligatoria
                </span>
              )}
            </label>

            <label className='flex-col flex mb-4'>
              Marca
              <input
                className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
                placeholder='Ingresa la marca de tu auto'
                type='text'
                id='brand'
                {...register('brand', { required: true })}
              />
              {errors.brand != null && (
                <span className='text-red-500'>
                  La Marca del auto es obligatoria
                </span>
              )}
            </label>

            <label className='flex-col flex mb-4'>
              Modelo
              <input
                className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
                placeholder='Ingresa el modelo de tu auto'
                type='text'
                id='model'
                {...register('model', { required: true })}
              />
              {errors.model != null && (
                <span className='text-red-500'>
                  El modelo del auto es obligatoria
                </span>
              )}
            </label>

            <label className='flex-col flex mb-4'>
              Color
              <input
                className='px-4 py-2 border border-[#D58418] rounded outline-none mt-2'
                placeholder='Ingresa el color de tu auto'
                type='text'
                id='color'
                {...register('color', { required: true })}
              />
              {errors.color != null && (
                <span className='text-red-500'>
                  El color del auto es obligatoria
                </span>
              )}
            </label>
          </section>

          {/* Botones de acción */}

          <button
            type='submit'
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold mt-8 '
            style={{ height: '40px', gap: '4px' }}
          >
            Guardar
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
