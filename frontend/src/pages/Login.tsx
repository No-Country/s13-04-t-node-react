import { useForm } from 'react-hook-form'

export default function Login(): JSX.Element {
  const { register , handleSubmit, formState:{errors}} = useForm()

  const onSubmit = (data: unknown) => console.log(data)


  return (
    <>
      <section>
        <h1 className='w-32 mt-3 text-2xl ml-[16px]'>Bienvenido</h1>
      </section>
      
      <section className="flex justify-center m-2 min-h-96 ">
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-96 h-40 gap-6 ">
          <article  className="flex flex-col ">
          <label
          className='' 
          htmlFor="email">Correo</label>
          <input
          className='border-solid border-[1px] border-black rounded-[4px] pt-[8px] pr-[10px] pb-[8px] pl-[16px] '
          placeholder='Ingresa tu correo'
          type="email"
          id="email"
          {...register('correo',{
            required:{
              value:true,
              message:'correo requerido.'
            },
            pattern:{
              value:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message:"El correo no es valido."
            }
          })}
          />
          {
            errors.correo && <span className='text-red-500'> {errors.correo.message} </span> 
          }
          </article>

          <article  className="flex flex-col ">

          <label htmlFor="password">Contraseña</label>
          <input
          className='border-solid border-[1px] border-black rounded-[4px] pt-[8px] pr-[10px] pb-[8px] pl-[16px] '
          placeholder='Ingresa tu contraseña'
          type="password"
          {...register('password',{
            required:{
              value:true,
              message:'Debe ingresar contraseña'
            },
            minLength:{
              value:6,
              message:'Debe tener al menos 8 caracteres'
            },
            maxLength:{
              value:15,
              message:'no debe ser mayor a 15 caracteres'
            },
            validate: ()=>{return false}
          })}
          />
           {
             errors.password ? <span className='text-red-600'></span> : null
            }
            </article>


          
        <button className='p-2 text-left'>¿Olvidaste la contraseña?</button>
          <button className="bg-[#D9D9D9] my-2 p-1 border-solid border-black border-[1px] rounded-[10px]">iniciar sesion</button>

            <article className='flex justify-center items-center'>

          <hr className='w-full mr-4 border-solid border-black'/> O <hr className='w-full ml-4 border-solid border-black' />
            </article>
            <button className="my-2 p-1 border-solid border-black border-[1px] rounded-[10px]">Registrate</button>
        </form>

      </section>
    </>
  )
}
