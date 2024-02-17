import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
interface Inputs {
  fullName:string
  dni:string
  email: string
  phone: string
  password: string
}
export default function UserRegisterForm() {
  const {state} = useLocation()
  const {form} = state
  console.log(form);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data); };
  return (
      <form className='flex-col flex gap-3' onSubmit={handleSubmit(onSubmit)}>
        <label className='flex-col flex '>Nombre y apellido
          <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa tu nombre y apellido' type='text' {...register('fullName', { required: true })} />
          {(errors.fullName != null) && <span className='text-red-500'>El nombre y apellido es obligatorio</span>}
        </label>
        <label className='flex-col flex '>DNI
          <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa tu numero de DNI' type='number' {...register('dni', { required: true })} />
          {(errors.dni != null) && <span className='text-red-500'>El DNI es obligatorio</span>}
        </label>
        <label className='flex-col flex '>E-mail
          <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa tu de E-mail' type='email' {...register('email', { required: true })} />
          {(errors.email != null) && <span className='text-red-500'>El E-mail es obligatorio</span>}
        </label>
        <label className='flex-col flex '>Celular
          <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa numero de celular' type='number' {...register('phone', { required: true })} />
          {(errors.phone != null) && <span className='text-red-500'>El numero de  celular es obligatorio</span>}
        </label>
        <label className='flex-col flex '>Contraseña
          <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa una contraseña' type='password' {...register('password', { required: true })} />
          {(errors.password != null) && <span className='text-red-500'>La contraseña es obligatoria</span>}
        </label>
        <label className='flex-col flex '>Repetir la contraseña
          <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Repetí la contraseña' type='password' {...register('password', { required: true })} />
          {(errors.password != null) && <span className='text-red-500'>La contraseña es obligatoria</span>}
        </label>
        <Link className='border rounded-md p-2 font-bold bg-gray-200 text-center' to={form === 'conductor' ? '/registro/conductor' : '/registro/estacionamiento'}>Siguiente</Link>
        <button className='border rounded-md p-2 font-bold'>Cancelar</button>
      </form>
  );
}
