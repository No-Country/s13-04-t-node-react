import { useNavigate } from 'react-router-dom';
import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { userService } from '../../services/user';
import { Slide, toast } from 'react-toastify';

export const DriverPassword = () => {
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('newPassword') as string;

    try {
      await userService.patchUser({ password });
      navigate('/mis-datos');
    } catch (error) {
      console.log('Error', error);
      toast.error('Ocurrio un error', {
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
  };

  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-10'>
        <h1 className='font-semibold text-2xl uppercase pb-8'>Contraseña</h1>

        <form className='w-full' onSubmit={onSubmit}>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <label className='pb-2'>Contraseña actual</label>
              <input
                type='text'
                name='password'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Ingresa tu contraseña actual'
              />
            </div>

            <div className='flex flex-col'>
              <label className='pb-2'>Contraseña nueva</label>
              <input
                type='text'
                name='newPassword'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Ingresa tu nueva contraseña'
              />
            </div>

            <div className='flex flex-col'>
              <label className='pb-2'>Repetir contraseña</label>
              <input
                type='text'
                name='newPassword'
                className='px-4 py-2 border border-[#D58418] rounded outline-none'
                placeholder='Repetí tu nueva contraseña'
              />
            </div>
          </div>

          <div className='flex flex-col gap-3 fixed bottom-10 inset-x-0 px-4'>
            <button
              type='submit'
              className='py-2 text-center bg-[#D58418] rounded-lg font-semibold'
            >
              Guardar
            </button>
            <button
              type='button'
              className='py-2 text-center bg-white border border-[#D58418] rounded-lg font-semibold'
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
