import React from 'react';

interface HeaderProps {
  name?: string;
  address?: string;
  price?: number;
}

const Header: React.FC<HeaderProps> = ({ name, address, price }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-1 items-center">
        <section className="col-span-3 w-full gap-1">
          <p className="text-xl uppercase">{name} </p>
          <p className="text-lg">{address}</p>
        </section>
        <section className="bg-[#5D2B2C] col-span-1 h-[52px] rounded-lg text-center flex items-center justify-center text-2xl text-white">
          4,5
        </section>
      </div>
      {/* Precio */}
      <div className="text-center p-4 text-2xl font-medium rounded-lg text-black bg-[#D58418]">
        <span className="">${price} x Hora </span>
      </div>
    </>
  );
};

export default Header;
