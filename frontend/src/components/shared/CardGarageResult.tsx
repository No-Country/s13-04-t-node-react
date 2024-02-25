import { Link } from 'react-router-dom';
import { FavoriteHeartButton } from './FavoriteHeartButton';

interface Props {
  id: string;
  name: string;
  price: number;
}

export const CardGarageResult = ({ id, name, price }: Props) => {
  return (
    <div>
      <div className='flex flex-row items-center justify-between py-2'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <div className='absolute right-1 top-1 cursor-pointer'>
              <FavoriteHeartButton id={id} />
            </div>

            <div className='absolute text-sm bg-white px-2 py-0.1 rounded-2xl bottom-1 ml-1'>
              Particular
            </div>
            <img
              src='/images/image.png'
              alt='imagen'
              className='w-20 h-20 rounded-md'
            />
          </div>

          <Link key={id} to={`/reservar/${id}`}>
            <div className='flex flex-col'>
              <h4 className='font-semibold pb-1 line-clamp-1'>{name}</h4>
              <p>Descripción del garaje</p>
              <span className='font-semibold'>${price} x hora</span>
            </div>
          </Link>
        </div>
        <span className='self-start px-1 py-0.5 bg-[#5D2B2C] text-white rounded-md'>
          0,0
        </span>
      </div>
    </div>
  );
};
