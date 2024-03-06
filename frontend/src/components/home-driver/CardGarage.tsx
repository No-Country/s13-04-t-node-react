import { IGarage } from '../../types/garage';
import ImageComponent from '../shared/ImageComponent';

export const CardGarage = ({ garage }: { garage: IGarage }) => {

  return (
    <div>
      <div className='w-36'>
        <ImageComponent images={garage.images} />
        <div className='p-1 flex justify-between font-semibold'>
          <h3 className='line-clamp-1'>{garage.name}</h3>
          {garage.rating > 0 ?
            <span className='items-center pr-1 min-h-6 min-w-fit flex text-sm text-white border-2 bg-[#5D2B2C] border-[#5D2B2C] rounded-[4px]'>
              <img src="/images/estrellaVacia.svg" alt="estrella vacia" />
              {garage.rating.toFixed(1)}
            </span>
            : null
          }
        </div>
        <p className='line-clamp-1'>{garage.address}</p>
        <span className='font-semibold'>${garage.price} x hora</span>
      </div>
    </div>
  );
};

