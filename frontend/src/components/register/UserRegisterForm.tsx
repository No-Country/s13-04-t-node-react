import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../../services/auth';
interface Inputs {
  [key: string]: string | File;
  name: string;
  identity: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  image: File;
  role: string;
}
export default function UserRegisterForm() {
  const { role } = useParams();
  const navigation = useNavigate();
  const [imgUser, setImgUser] = useState<string | ArrayBuffer>(
    '/images/addPhotoUser.svg'
  );
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    formData.append(
      'role',
      role === 'conductor' ? 'agregar-vehiculo' : 'parking'
    );
    formData.delete('confirmPassword');
    const res = await authService.signup(formData);
    if (res === 201) {
      navigation(`/${role}`);
    } else {
      console.log(res);
    }
  };
  const loadNewImage = (newImage: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(newImage);
    reader.onload = (e) => {
      setImgUser((prevState) => {
        return e.target?.result ?? prevState;
      });
    };
  };
  return (
    <form
      className='flex-col flex gap-3 text-sm'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className='flex relative mx-auto mt-4 mb-6 max-w-[220px] w-1/2 aspect-square'>
        <img
          src={imgUser as string}
          className='w-full aspect-square object-contain rounded-3xl'
          alt='user profile'
        />
        <input
          onChange={(e) => {
            if (e.target.files?.item(0)) {
              const file = e.target.files[0];
              loadNewImage(file);
              setValue('image', file);
            }
          }}
          type='file'
          className='absolute border-4 opacity-0 w-full h-full z-10'
        />
      </label>
      <label className='flex-col flex mb-6'>
        Nombre y apellido
        <input
          className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1'
          placeholder='Ingresa tu nombre y apellido'
          type='text'
          {...register('name', { required: true })}
        />
        {errors.name != null && (
          <span className='text-red-500'>
            El nombre y apellido es obligatorio
          </span>
        )}
      </label>
      <label className='flex-col flex mb-6 '>
        Documento de identidad
        <input
          className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1'
          placeholder='Ingresa tu numero de DNI'
          type='text'
          {...register('identity', { required: true })}
        />
        {errors.identity != null && (
          <span className='text-red-500'>
            El documento de identidad es obligatorio
          </span>
        )}
      </label>
      <label className='flex-col flex mb-6 '>
        E-mail
        <input
          className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1'
          placeholder='Ingresa tu de E-mail'
          type='email'
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email != null && (
          <span className='text-red-500'>El E-mail es obligatorio</span>
        )}
      </label>
      <label className='flex-col flex mb-6 '>
        Celular
        <input
          className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1'
          placeholder='Ingresa numero de celular'
          type='text'
          {...register('phone', { required: true })}
        />
        {errors.phone != null && (
          <span className='text-red-500'>
            El numero de celular es obligatorio
          </span>
        )}
      </label>
      <label className='flex-col flex mb-6 '>
        Contraseña
        <input
          className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1'
          placeholder='Ingresa una contraseña'
          type='password'
          {...register('password', {
            required: true,
            min: 6,
          })}
        />
        {errors.password != null && (
          <span className='text-red-500'>La contraseña es obligatoria</span>
        )}
      </label>
      <label className='flex-col flex mb-6 '>
        Repetir la contraseña
        <input
          className='border-[#D58418] border rounded-md py-2 px-3 placeholder:text-black mt-1'
          placeholder='Repetí la contraseña'
          type='password'
          {...register('confirmPassword', {
            validate: (value) => value === getValues('password'),
          })}
        />
        {errors.confirmPassword != null && (
          <span className='text-red-500'>Las contraseñas no coinciden</span>
        )}
      </label>
      <button
        className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
        type='submit'
      >
        Siguiente
      </button>
      <button
        className='border rounded-3xl p-2 font-bold text-center'
        type='button'
        onClick={(e) => {
          e.preventDefault();
          navigation('/registro');
        }}
      >
        cancelar
      </button>
      {/* <Link to={"/"} className="border rounded-md p-2 font-bold text-center">
				Cancelar
			</Link> */}
    </form>
  );
}
