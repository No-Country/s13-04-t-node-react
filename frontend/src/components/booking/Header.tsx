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

        {rating &&
          <span className='bg-[#5D2B2C] col-span-1 gap-1 h-[52px] rounded-lg flex items-center mx-auto pr-2 text-2xl text-white'>
            <img src="/images/estrellaVacia.svg" alt="estrella vacia" />
            {rating.toFixed(1)}
          </span>
        }
      </div>
      {/* Precio */}
      <div className='text-center p-4 text-2xl font-medium rounded-lg text-black bg-[#D58418]'>
        <span>${price} x Hora </span>
      </div>
    </div>
  );
};

export default Header;
