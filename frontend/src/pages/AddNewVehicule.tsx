import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface Inputs {
  licensePlate: string
  vehiculeBrand: string
  vehiculeModel: string
  vehiculeColor: string

}

export default function AddNewVehicule (): JSX.Element {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data); };

    return (
      <main className='p-6' >
        {/* Titulos de la pantalla */}
        <h1 className='font-bold'>AÑADIR VEHICULO</h1>
        <p>Completa los datos de tu vehiculo</p>     
         
        <form className='flex-col flex gap-3 mb-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Campos a llenar */}
          <section> 
           <label className='flex-col flex mb-4 mt-4'>Patente
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la patente de tu auto' type='text' {...register('licensePlate', { required: true })} />
            {(errors.licensePlate != null) && <span className='text-red-500'>La patente del auto es obligatoria</span>}
           </label>

           <label className='flex-col flex mb-4'>Marca
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la marca de tu auto' type='text' {...register('vehiculeBrand', { required: true })} />
            {(errors.vehiculeBrand != null) && <span className='text-red-500'>La Marca del auto es obligatoria</span>}
           </label>

           <label className='flex-col flex mb-4'>Modelo
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el modelo de tu auto' type='text' {...register('vehiculeModel', { required: true })} />
            {(errors.vehiculeModel != null) && <span className='text-red-500'>El modelo del auto es obligatoria</span>}
           </label>

           <label className='flex-col flex '>Color
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el modelo de tu auto' type='text' {...register('vehiculeColor', { required: true })} />
            {(errors.vehiculeColor != null) && <span className='text-red-500'>El color del auto es obligatoria</span>}
           </label>
          </section>

        {/* Botones de acción */}
        <Link to='*'> 
        <button className='bg-gray-300 text-black rounded-md px-16 py-2 font-bold  mt-4 w-full' style={{  height: '40px', borderRadius: '10px', gap: '8px' }}>Guardar</button>
        </Link>
        
        <Link to='*'>
          <button className='bg-white text-black border border-gray-400 rounded-md px-16 py-2 font-bold mt-1 w-full' style={{ height: '40px', borderRadius: '10px', padding: '8px 16px', border: '1px solid #979797', gap: '8px' }}>Cancelar</button>
        </Link>

        </form>
      </main>
    )
  }
  