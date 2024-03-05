import React from 'react';

interface HeaderProps {
  name?: string;
  address?: string;
  price?: number;
  rating: number | null;
}

const Header: React.FC<HeaderProps> = ({ name, address, price, rating }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-4 gap-1 items-center mb-4'>
        <div className='col-span-3 w-full gap-1'>
          <p className='text-xl uppercase'>{name} </p>
          <p className='text-lg'>{address}</p>
        </div>

        {rating && (
          <div className='bg-[#5D2B2C] col-span-1 h-[52px] rounded-lg text-center flex items-center justify-center text-2xl text-white'>
            {rating}
          </div>
        )}
      </div>
      {/* Precio */}
      <div className='text-center p-4 text-2xl font-medium rounded-lg text-black bg-[#D58418]'>
        <span>${price} x Hora </span>
      </div>
    </div>
  );
};

export default Header;
