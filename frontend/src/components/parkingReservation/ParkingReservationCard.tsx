import { Link } from 'react-router-dom';
import { MdOutlineMessage } from "react-icons/md";

type ParkingReservationsCardProps = {
  showButtons?: boolean;
  showModel?: boolean;
  showDate?: boolean; 
  showChat?: boolean;
  textColor?: string,
  bgColor?: string,
  carIconSrc?: string,
  showImgUser?:boolean,
  onAccept?: () => void,
  onReject?: () => void,
  isLink?: boolean, // Prop para indicar si el card debe ser un enlace
};

export const ParkingReservatiosCard: React.FC<ParkingReservationsCardProps> = ({
  showButtons = true,
  showModel = true,
  showDate = true,
  showChat = true,
  textColor = 'black',
  bgColor = 'bg-[#D58418]',
  carIconSrc = "/images/car-icon.svg",
  showImgUser = true,
  onAccept,
  onReject,
  isLink = false, // Por defecto, no es un enlace
}) => {
  const cardContent = (
    <div
      className={`py-1 border-2 rounded-md flex flex-col items-center ${bgColor} py-4`}
    >
      <img src={carIconSrc} alt="car icon" />
      <span className={`line-clamp-1 text-xl font-bold tracking-wide ${textColor}`}>
        AA000AA
      </span>
      {showModel && <span className="text-base">Marca - Modelo</span>}
      {showDate && <span className="text-base">Día - Horario</span>}
    </div>
  );

  return (
    <div
      className="p-2"
      style={{ boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.30)" }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-1"></div>
        {isLink ? ( // Verifica si el card debe ser un enlace
          <Link to="/gestionarParking/reserva">
            {cardContent}
          </Link>
        ) : (
          cardContent
        )}
        <div className="flex flex-row justify-between items-center">
          {showImgUser && <img src='/images/user-icon.svg' alt='icon-car' className="w-12 h-12 " />}
          <span>Nombre de Usuario</span>
          <div className="flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-1 py-1 ml-auto">
            <span>0,0</span>
          </div>
          {showChat && <button className="text-3xl flex-shrink-0 ml-2" /*onClick={redirectToChat}*/>
            <MdOutlineMessage />
          </button> }
        </div>
        {showButtons && (
          <div className="flex flex-row justify-end space-x-4 font-semibold">
            {onAccept && <button onClick={onReject}>Rechazar</button> }
            {onAccept && <button onClick={onAccept}>Aceptar</button>}
          </div>
        )}
      </div>
    </div>
  );
};
