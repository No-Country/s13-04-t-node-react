import CustomButton from '../../components/utilities/CustomButton';

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <img src='https://img.freepik.com/vector-gratis/ilustracion-concepto-uy-error-404-robot-roto_114360-1932.jpg?w=740&t=st=1708805667~exp=1708806267~hmac=a9835b45474d97d4a60822dffd7bf5fcd387c655beb1342935271c2d910b2c41' alt="404 Not Found" className='w-1/2 md:w-1/4 mb-8' />

      <p className='text-lg text-gray-800 mb-4'>Lo siento, esta pagina no esta disponible actualmente. Te sugiero que vuelvas al inicio.</p>
      <CustomButton text='Volver al inicio' type='secondary' to='/' />
    </div>
  );
};
