import { useNavigate } from 'react-router-dom';
import { HeaderLogo } from '../components/HeaderLogo';
import { authService } from '../services/auth';

export const DriverEmail = () => {
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('newEmail') as string;

    try {
      await authService.patchUser({ email });
      navigate('/mis-datos');
    } catch (error) {
      console.log('Error', error);
      alert('Ocurrio un error');
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-10'>
        <h1 className='font-semibold text-2xl uppercase pb-8'>Email</h1>

        <form className='w-full' onSubmit={onSubmit}>
          <div className='flex flex-col'>
            <label className='pb-2'>E-mail</label>
            <input
              type='text'
              name='newEmail'
              required
              className='px-4 py-2 border border-[#D58418] rounded outline-none'
              placeholder='Ingresa tu nuevo e-mail'
            />
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
