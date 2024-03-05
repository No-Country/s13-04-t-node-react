import { Link } from 'react-router-dom';
import { FavoriteHeartButton } from './FavoriteHeartButton';
import { Image } from '../../types/garage';
import ImageComponent from './ImageComponent';

interface Props {
  id: string;
  name: string;
  price: number;
  images: Image[];
  rating: number | null;
  address: string;
}

export const CardGarageResult = ({
  id,
  name,
  price,
  images,
  address,
  rating,
}: Props) => {
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
            <ImageComponent
              images={images}
              style='w-20 h-20 rounded-md object-cover min-w-20'
            />
          </div>

          <Link
            key={id}
            to={`/reservar/${id}`}
            className='overflow-hidden max-w-[45vw] '
          >
            <div className='flex flex-col'>
              <h4 className='font-semibold pb-1 line-clamp-1'>{name}</h4>
              <p className='line-clamp-1'>{address}</p>
              <span className='font-semibold'>${price} x hora</span>
            </div>
          </Link>
        </div>
        {rating ? (
          <span className='items-center pr-1 min-h-6 min-w-fit flex text-sm text-white border-2 bg-[#5D2B2C] border-[#5D2B2C] rounded-[4px]'>
            <img src='/public/images/estrellaVacia.svg' alt='estrella vacia' />
            {rating.toFixed(1)}
          </span>
        ) : null}
      </div>
    </div>
  );
};
