// import { MouseEventHandler } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { RiArrowGoForwardFill, RiCloseLine } from "react-icons/ri";

type CarReservationCarProps = {
    name?: string;
    address?: string;
    start?: string;
    end?: string
    plate?: string;
    pending?: boolean;
    past?: boolean
    onAction?: () => void | undefined;
    handleRedirect?: () => void | undefined
}

export const CarReservationCard: React.FC<CarReservationCarProps> = ({
    name = 'Car Name',
    address = 'Car Address',
    start = new Date().toLocaleTimeString(),
    end = new Date().toLocaleTimeString(),
    plate = 'Car Plate',
    pending = false,
    past = false,
    onAction = undefined,
    handleRedirect
}) => {

    return (
        <div className='p-4 shadow-md rounded'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between gap-1'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-xl font-semibold'>{name}</h2>
                        <span className='line-clamp-1'>
                            {address}
                        </span>
                    </div>
                    {/* se podria agregar un toast al boton de mensaje para avisar que todavia no está disponible */}
                    <MdOutlineMessage className='text-3xl' />
                </div>

                <div className='py-1 border-2 border-[#D58418] rounded-md text-center'>
                    <span className='text-lg font-semibold'>{start} {'A'} {end}</span>
                </div>
                <div className='py-1 border-2 border-[#5B5751] rounded-md text-center'>
                    <span className='text-lg font-semibold'>{plate}</span>
                </div>

                <div className='flex items-center justify-between bg-[#5D2B2C] text-white rounded-md text-center px-4 py-2'>
                    <span>CÓDIGO DE RESERVA:</span>
                    <span>2548793</span>
                </div>
                {pending &&
                    <div className='flex items-center gap-1'>
                        <RiCloseLine className='text-2xl text-[#5D2B2C] font-extrabold' />
                        <button onClick={onAction}>
                            <span className='text-lg font-semibold'>Cancelar reserva</span>
                        </button>
                    </div>
                }
                {past &&
                    <div className="flex justify-between gap-2">
                        <div className=''>
                            <button className="flex items-center" onClick={onAction}>
                                <img src="/images/estrellaVaciaBlack.svg" alt="estrella vacia" />
                                <span className='text-lg font-semibold'>Valorar</span>
                            </button>
                        </div>
                        <div className=''>
                            {/* completar para volver a reservar */}
                            <button className="flex" onClick={handleRedirect}>
                                <RiArrowGoForwardFill className='text-2xl text-[#5D2B2C] font-extrabold' />
                                <span className='text-lg font-semibold'>Volver a reservar</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}