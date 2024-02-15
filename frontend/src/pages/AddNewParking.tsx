import { type SubmitHandler, useForm } from 'react-hook-form'
interface Inputs {
  typeParking: string
  nameParking: string
  address: string
  city: string
  postalCode: number
  state: string
  country: string

}

export default function AddNewParking () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data) }
  return (
    <main className='p-6' >
      <h1 className='font-bold'>AÑADIR ESTACIONAMIENTO</h1>
      <p>Completa los datos de tu estacionamiento</p>
      <form className='flex-col flex gap-3' onSubmit={handleSubmit(onSubmit)}>
      <label className='flex-col flex '>Tipo de estacionamiento
      <select className='border rounded-md py-2 px-3 bg-transparent' {...register('typeParking', { required: true })} >
        <option value="" selected disabled >Selecciona el tipo de estacionamiento</option>
        <option value="Particular">Particular</option>
        <option value="Estacionamiento">Estacionamiento</option>
      </select>
      {(errors.typeParking != null) && <span className='text-red-500'>El tipo de estacionamiento es obligatorio</span>}
      </label>
      <label className='flex-col flex '>Nombre del estacionamiento
      <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el nombre del estacionamiento' type='text' {...register('nameParking', { required: true })} />
      {(errors.nameParking != null) && <span className='text-red-500'>El nombre del estacionamiento es obligatorio</span>}
      </label>
      <section className='mt-3'>
      <h2 className='font-bold'>DIRECCIÓN</h2>
      <section className='flex flex-col gap-2'>
      <label className='flex-col flex '>País
      <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el País' type='text' {...register('country', { required: true })} />
      {(errors.nameParking != null) && <span className='text-red-500'>La País es obligatoria</span>}
      </label>
      <label className='flex-col flex '>Provincia/Estado/Departamento
      <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la provincia, estado o departamento' type='text' {...register('state', { required: true })} />
      {(errors.nameParking != null) && <span className='text-red-500'>La Estado es obligatoria</span>}
      </label>
      <label className='flex-col flex '>Ciudad
      <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la Ciudad' type='text' {...register('city', { required: true })} />
      {(errors.nameParking != null) && <span className='text-red-500'>La ciudad es obligatoria</span>}
      </label>
      <label className='flex-col flex '>Código postal
      <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el código postal' type='text' {...register('postalCode', { required: true })} />
      {(errors.nameParking != null) && <span className='text-red-500'>el código postal es obligatoria</span>}
      </label>
      <label className='flex-col flex '>Calle y numero
      <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la calle y el número' type='text' {...register('address', { required: true })} />
      {(errors.nameParking != null) && <span className='text-red-500'>La calle y el número es obligatorio</span>}
      </label>
      </section>
      </section>
      <button className='border rounded-md p-2 font-bold bg-gray-200'>Siguiente</button>
      <button className='border rounded-md p-2 font-bold'>Cancelar</button>
    </form>
    </main>
  )
}
