import { CardCar } from './CardCar';

export const CardCarSelection = () => {
  return (
    <div className='pt-5'>
      <div className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
        <CardCar />
        <CardCar />
        <CardCar />
      </div>
    </div>
  );
};
