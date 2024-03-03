import { IGarage } from '../../types/garage';
import ImageComponent from '../shared/ImageComponent';

export const CardGarage = ({ garage }: { garage: IGarage }) => {

  return (
    <div>
      <div className='w-36'>
        <ImageComponent images={garage.images} />
      
        <div className='flex justify-between font-semibold'>
          <h3 className='line-clamp-1'>{garage.name}</h3>
          <span>{garage.rating}</span>
        </div>
        <p className='line-clamp-1'>{garage.address}</p>
        <span className='font-semibold'>${garage.price} x hora</span>
      </div>
    </div>
  );
};

