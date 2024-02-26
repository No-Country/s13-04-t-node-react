import { IGarage } from '../../types/garage';

export const CardGarage = ({ garage }: { garage: IGarage }) => {
  return (
    <div>
      <div className='w-36'>
        <img
          src='/images/image.png'
          alt='garaje'
          className='rounded-md w-full object-cover'
        />
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
