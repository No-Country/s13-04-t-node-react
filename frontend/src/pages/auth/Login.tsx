import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { HeaderLanding } from '../../components/landing/HeaderLanding';
import { Slide, toast } from 'react-toastify';
import { useState } from 'react';
import { LoadingIcon } from '../../components/shared/LoadingIcon';

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const enviarDatos = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await authService.login(data.correo, data.contraseña);
      navigation('/');
    } catch (error) {
      toast.error('Hay algo mal en tus credenciales', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    }
    setIsLoading(false);
  });

  return (
    <>
      <HeaderLanding />

      <div className='p-4'>
        <h1 className='text-2xl uppercase pt-2 font-semibold'>Bienvenido</h1>
        <p>Iniciar sesión</p>
      </div>

      <section className='flex justify-center m-2 min-h-96 '>
        <form onSubmit={enviarDatos} className='flex flex-col w-96 h-40 gap-6 '>
          <article className='flex flex-col '>
            <label htmlFor='correo'>E-mail</label>
            <input
              className='border-solid border-[1px] border-black rounded-[4px] pt-[8px] pr-[10px] pb-[8px] pl-[16px] '
              placeholder='Ingresa tu e-mail'
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

          <button type='button' className='text-left font-semibold pb-4'>
            ¿Olvidaste tu contraseña?
          </button>
          <button
            type='submit'
            className={`py-2 text-center ] rounded-3xl font-semibold w-full ${
              isLoading ? 'bg-[#FFE9CC]' : 'bg-[#D58418]'
            }`}
          >
            {isLoading ? <LoadingIcon width={16} /> : 'Iniciar sesión'}
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
