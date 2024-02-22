import { Link } from 'react-router-dom';
// import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { ISearchGarage } from '../../types/garage';

interface Props {
  garage: ISearchGarage;
}

export const CardGarageResult = ({ garage }: Props) => {
  return (
    <Link key={garage.id} to='/reservar'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <FaHeart className='absolute right-1 top-1 text-xl text-red-500' />
            <div className='absolute text-sm bg-white px-2 py-0.1 rounded-2xl bottom-1 ml-1'>
              Particular
            </div>
            <img
              src='/images/image.png'
              alt='imagen'
              className='w-20 h-20 rounded-md'
            />
          </div>

          <div className='flex flex-col'>
            <h4 className='font-semibold pb-1 line-clamp-1'>{garage.name}</h4>
            <p>Descripción del garaje</p>
            <span className='font-semibold'>${garage.price} x hora</span>
          </div>
        </div>
        <span className='self-start px-1 py-0.5 bg-[#5D2B2C] text-white rounded-md'>
          0,0
        </span>
      </div>
    </Link>
  );
};
