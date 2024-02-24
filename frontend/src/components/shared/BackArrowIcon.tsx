import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const BackArrowIcon = () => {
  return (
    <Link to='/' className='flex items-center gap-2'>
      <FaArrowLeft className='text-2xl text-[#5D2B2C]' />
      <span className='text-lg font-semibold'>Volver</span>
    </Link>
  );
};
