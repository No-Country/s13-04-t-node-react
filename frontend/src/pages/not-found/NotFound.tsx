import CustomButton from '../../components/utilities/CustomButton';

export const NotFound = () => {
  return (
    <div className='p-2 flex flex-col items-center justify-between h-screen'>
      <div className='flex flex-col mt-6'>
        <img src='/images/404-auto.png' alt="404 Not Found" className='md:w-1/4 mb-8' />
        <h1 className='text-3xl font-semibold'>¡Ups!</h1>
        <p className='text-sm font-normal'>La página que estás buscando no está disponible en este momento.</p>
        <p className='text-lg font-light'>Puedes volver al inicio e intentarlo nuevamente.</p>
      </div>
      <CustomButton text='Volver al inicio' type='primary' to='/' />
    </div>
  );
};
