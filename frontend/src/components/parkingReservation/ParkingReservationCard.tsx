import { Link } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { MouseEventHandler } from "react";

type ParkingReservationsCardProps = {
  showValorateButtons?: boolean;
  showButtons?: boolean;
  showModel?: boolean;
  showDate?: boolean;
  showChat?: boolean;
  textColor?: string;
  bgColor?: string;
  carIconSrc?: string;
  showImgUser?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  isLink?: boolean; // Prop para indicar si el card debe ser un enlace
  id?: string;
  patente?: string;
  modelo?: string;
  marca?: string;
  userName?: string;
  ranking?: number;
  garageName?: string;
  linkTo?: {
    pathname: string;
    state: object;
  };
  setOpenModal? : MouseEventHandler<HTMLButtonElement>
};
export const ParkingReservatiosCard: React.FC<ParkingReservationsCardProps> = ({
  showValorateButtons = false,
  showButtons = true,
  showModel = true,
  showDate = true,
  showChat = true,
  textColor = "black",
  bgColor = "bg-[#D58418]",
  carIconSrc = "/images/car-icon.svg",
  showImgUser = true,
  onAccept,
  onReject,
  isLink = false, // Por defecto, no es un enlace
  patente = "string",
  modelo = "string",
  marca = "string",
  userName = "string",
  ranking = undefined,
  garageName = "string",
  linkTo,
  setOpenModal = () => {}
}) => {

  const cardContent = (
    <div
      className={`py-1 border-2 rounded-md flex flex-col items-center ${bgColor} py-4`}
    >
      <img src={carIconSrc} alt="car icon" />
      <span
        className={`line-clamp-1 text-xl font-bold tracking-wide ${textColor}`}
      >
        {patente}
      </span>
      {showModel && (
        <span className="text-base">
          {marca} - {modelo}
        </span>
      )}
      {showDate && <span className="text-base">Día - Horario</span>}
    </div>
  );

  return (
    <div
      className="p-2"
      style={{ boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.30)" }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-1"></div>
        {isLink && linkTo ? ( // Verifica si el card debe ser un enlace y si hay una ruta proporcionada
          <Link to={linkTo.pathname} state={linkTo.state}>
            {cardContent}
          </Link>
        ) : (
          cardContent
        )}
        <div className="flex flex-row justify-between items-center">
          {showImgUser && (
            <img
              src="/images/user-icon.svg"
              alt="icon-car"
              className="w-12 h-12 "
            />
          )}
          <span className="ml-2">{userName}</span>
          {ranking && (
            <div className="flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-1 py-1 ml-auto">
              <img src="/images/whiteStar.svg" alt="star" />
              <span className="ml-1">{ranking}</span>
            </div>
          )}
          {showChat && (
            <button
              className="text-3xl flex-shrink-0 ml-2" /*onClick={redirectToChat}*/
            >
              <MdOutlineMessage />
            </button>
          )}
        </div>
        <div className="ml-2">
          <span className="text-red-900 text-xl font-semibold">
            {garageName}
          </span>
        </div>
        {showValorateButtons && (
        <div className="flex flex-row justify-end space-x-1 font-semibold">
          <img src="/images/valorateStar.svg" alt="valorate star" />
          <button onClick={setOpenModal}>Valorar conductor</button>
        </div>
      )}
    

        {showButtons && (
          <div className="flex flex-row justify-end space-x-4 font-semibold">
            {onAccept && <button onClick={onReject}>Rechazar</button>}
            {onAccept && <button onClick={onAccept}>Aceptar</button>}
          </div>
        )}
      </div>
    </div>
  );
};
