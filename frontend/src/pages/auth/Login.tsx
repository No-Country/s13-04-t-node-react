import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();

  const enviarDatos = handleSubmit(async (data) => {
    try {
      await authService.login(data.correo, data.contraseña);
      navigation('/');
    } catch (error) {
      alert('Hay algo mal en tus credenciales');
    }
  });

  return (
    <>
      <section>
        <Link to='/'>
          <h1 className='w-32 mt-3 text-2xl ml-[16px]'>Bienvenido</h1>
        </Link>
      </section>

      <section className='flex justify-center m-2 min-h-96 '>
        <form onSubmit={enviarDatos} className='flex flex-col w-96 h-40 gap-6 '>
          <article className='flex flex-col '>
            <label htmlFor='correo'>Correo</label>
            <input
              className='border-solid border-[1px] border-black rounded-[4px] pt-[8px] pr-[10px] pb-[8px] pl-[16px] '
              placeholder='Ingresa tu correo'
              type='email'
              id='correo'
              {...register('correo', {
                required: {
                  value: true,
                  message: 'correo requerido.',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'El correo no es valido.',
                },
              })}
            />

            {/* {/* {
              errors.correo && <span className='text-red-500'> {errors.correo.message} </span>
            } */}
          </article>

          <article className='flex flex-col '>
            <label htmlFor='contraseña'>Contraseña</label>
            <input
              className='border-solid border-[1px] border-black rounded-[4px] pt-[8px] pr-[10px] pb-[8px] pl-[16px] '
              placeholder='Ingresa tu contraseña'
              type='password'
              id='contraseña'
              {...register('contraseña', {
                required: {
                  value: true,
                  message: 'Debe ingresar contraseña',
                },
                minLength: {
                  value: 6,
                  message: 'Debe tener al menos 6 caracteres',
                },
                maxLength: {
                  value: 15,
                  message: 'no debe ser mayor a 15 caracteres',
                },
                // ,
                // pattern: {
                //   value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i,
                //   message: "La contraseña debe tener al menos un número, una minúscula y una mayúscula."
                // }
              })}
            />
            {/* {
              errors.contraseña ? <span className='text-red-600'>{errors.contraseña.message}</span> : null
            } */}
          </article>

          <button type='button' className='p-2 text-left'>
            ¿Olvidaste la contraseña?
          </button>
          <button
            className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
            type='submit'
          >
            Iniciar sesión
          </button>

          <article className='flex justify-center items-center'>
            <hr className='w-full mr-4 border-solid border-black' /> O{' '}
            <hr className='w-full ml-4 border-solid border-black' />
          </article>

          <button
            className='border-[2px] border-[#D58418] rounded-3xl p-2 font-bold text-center'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              navigation('/registro/usuario/conductor');
            }}
          >
            Registrate como conductor
          </button>
          <button
            className='border-[2px] border-[#D58418] rounded-3xl p-2 font-bold text-center'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              navigation('/registro/usuario/estacionamiento');
            }}
          >
            Registrate como estacionamiento
          </button>
        </form>
      </section>
    </>
  );
};
