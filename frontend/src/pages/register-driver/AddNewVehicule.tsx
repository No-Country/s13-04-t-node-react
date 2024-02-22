import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/auth';
import { vehiculeService } from '../../services/vehicule';


export default function AddNewVehicule (): JSX.Element {
const user = useCurrentUser ()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  //const onSubmit: SubmitHandler<Inputs> = (data) => { sendData.current(data) };
  const navigate = useNavigate();

  const sendData = handleSubmit(async (data) => {
    console.log(data)
      const vehicule = {
    idUser: user.id,
    brand: data.brand,
    model: data.model,
    plate: data.plate,
    color: data.color
  };
    try {
      await vehiculeService.addVehicule(vehicule);
      navigate('/'); // revisar la navegacion
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

  console.log(errors)
    return (
      <main className='p-6' >
        {/* Titulos de la pantalla */}
        <h1 className='font-bold'>AÑADIR VEHICULO</h1>
        <p>Completa los datos de tu vehiculo</p>     
         
        <form className='flex-col flex gap-3 mb-4' onSubmit={sendData}>
          {/* Campos a llenar */}
          <section> 
           <label className='flex-col flex mb-4 mt-4'>Patente
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la patente de tu auto' type='text' id='plate' {...register('plate', { required: true })} />
            {(errors.plate != null) && <span className='text-red-500'>La patente del auto es obligatoria</span>}
           </label>

           <label className='flex-col flex mb-4'>Marca
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa la marca de tu auto' type='text' id='brand' {...register('brand', { required: true })} />
            {(errors.brand != null) && <span className='text-red-500'>La Marca del auto es obligatoria</span>}
           </label>

           <label className='flex-col flex mb-4'>Modelo
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el modelo de tu auto' type='text' id='model' {...register('model', { required: true })} />
            {(errors.model != null) && <span className='text-red-500'>El modelo del auto es obligatoria</span>}
           </label>

           <label className='flex-col flex '>Color
           <input className='border rounded-md py-2 px-3 placeholder:text-black' placeholder='Ingresa el modelo de tu auto' type='text' id='color' {...register('color', { required: true })} />
            {(errors.color != null) && <span className='text-red-500'>El color del auto es obligatoria</span>}
           </label>
          </section>

        {/* Botones de acción */}
        
        <button className='bg-gray-300 text-black rounded-md px-16 py-2 font-bold  mt-4 w-full' style={{  height: '40px', borderRadius: '10px', gap: '8px' }}>Guardar</button>
       
        
        <Link to='*'>
          <button className='bg-white text-black border border-gray-400 rounded-md px-16 py-2 font-bold mt-1 w-full' style={{ height: '40px', borderRadius: '10px', padding: '8px 16px', border: '1px solid #979797', gap: '8px' }}>Cancelar</button>
        </Link>

        </form>
      </main>
    )
  }
  