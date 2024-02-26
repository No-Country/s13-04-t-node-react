import React from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  to: string; // URL de destino del botón de volver
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  return (
    <Link to={to}>
      <div className="flex items-center text-black px-4 py-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 transform rotate-0"
          viewBox="0 0 19 16"
          fill="none"
        >
          <path
            fill="#5D2B2C"
            d="M4.8417 9.43499L9.00314 13.5964C9.26622 13.8595 9.39776 14.1943 9.39776 14.6009C9.39776 15.0075 9.26622 15.3423 9.00314 15.6054C8.74006 15.8685 8.40523 16 7.99865 16C7.59208 16 7.25725 15.8685 6.99417 15.6054L0.393272 9.0045C0.249774 8.861 0.147891 8.70555 0.0876217 8.53813C0.0273527 8.37072 -0.001825 8.19135 8.83068e-05 8.00001C8.83068e-05 7.80868 0.0302228 7.62931 0.0904918 7.4619C0.150761 7.29448 0.251688 7.13903 0.393272 6.99553L6.99417 0.394634C7.25725 0.131554 7.59208 1.52588e-05 7.99865 1.52588e-05C8.40523 1.52588e-05 8.74006 0.131554 9.00314 0.394634C9.26622 0.657713 9.39776 0.992541 9.39776 1.39912C9.39776 1.8057 9.26622 2.14052 9.00314 2.4036L4.8417 6.56504H17.3333C17.7399 6.56504 18.081 6.7028 18.3565 6.97831C18.632 7.25383 18.7693 7.59439 18.7683 8.00001C18.7683 8.40659 18.6306 8.74764 18.355 9.02315C18.0795 9.29867 17.739 9.43595 17.3333 9.43499H4.8417Z"
          />
        </svg>
        <span className="font-roboto-condensed text-base font-medium">
          Volver
        </span>
      </div>
    </Link>
  );
};

export default BackButton;
