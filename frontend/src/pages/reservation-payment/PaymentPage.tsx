import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { useEffect, useState } from 'react';
import { IGarage } from '../../types/garage';
import { garageService } from '../../services/garage';
import { payMentService } from '../../services/payment';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
function calcDiff(dateStart: string, dateEnd: string, price_Hour: number) {
  const startHour = new Date(dateStart).getHours();
  const startMinutes = new Date(dateStart).getMinutes();
  const endHour = new Date(dateEnd).getHours();
  const endMinutes = new Date(dateEnd).getMinutes();

  const startMinutesTotal = startHour * 60 + startMinutes;
  const endMinutesTotal = endHour * 60 + endMinutes;

  const diffMinutes = endMinutesTotal - startMinutesTotal;

  const diffHours = diffMinutes / 60;
  return price_Hour * diffHours;
}
export const PaymentPage = () => {
  const navigation = useNavigate();
  const dataIn = {
    idCar: '2d984c18-a331-41f9-8d3e-acb4447b1da4',
    idGarage: '4148e900-0e29-4a6a-8a02-1dc7d6f9d6fa',
    dateStart: '2024-03-03T20:00:00.991Z',
    dateEnd: '2024-03-04T02:00:00.217Z',
    price_Hour: 3579,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [parking, setParking] = useState<IGarage>();
  useEffect(() => {
    garageService.getById(dataIn.idGarage).then((res) => {
      setParking(res);
    });
  }, []);
  const [optionSelected, setOptionSelected] = useState<number>(0);

  const onsubmit = () => {
    setIsLoading(true);
    const data = {
      ...dataIn,
      price: calcDiff(dataIn.dateStart, dataIn.dateEnd, parking.price),
    };
    if (optionSelected === 2) {
      navigation('/efectivo-pago');
    } else if (optionSelected === 1) {
      payMentService.payMercadoPago(data).then((res) => {
        window.location.href = res.route;
      });
    } else {
      setIsLoading(false);
    }
  };
  return (
    <>
      <HeaderLogo />
      <div className='p-4'>
        <h1 className='text-2xl font-semibold uppercase'>{parking?.name}</h1>
        <h1 className='text-2xl font-semibold uppercase'>{parking?.name}</h1>
        <span className='font-semibold text-lg'>Pago</span>
        <div className='flex items-center justify-between py-6 text-lg'>
          <span>Total a abonar:</span>
          <span className='font-semibold'>
            ${calcDiff(dataIn.dateStart, dataIn.dateEnd, dataIn.price_Hour)}
          </span>
          <span className='font-semibold'>
            ${calcDiff(dataIn.dateStart, dataIn.dateEnd, dataIn.price_Hour)}
          </span>
        </div>

        <p>Seleccionar método de pago</p>

        <div className='grid grid-cols-2 items-center justify-between pt-4 gap-4'>
          <div
            onClick={() => setOptionSelected(1)}
            className={`flex cursor-pointer items-center justify-center border border-[#0A0080] rounded-md p-2 w-full hover:bg-[#00BCFF] ${
              optionSelected === 1 && 'bg-[#00BCFF]'
            }`}
          >
            <img src='/images/payment.svg' alt='mercado-pago' />
          </div>
          <div
            onClick={() => setOptionSelected(2)}
            className={`flex cursor-pointer items-center justify-center border border-black rounded-md p-2 w-full font-semibold hover:bg-[#D58418] ${
              optionSelected === 2 && 'bg-[#D58418]'
            }`}
          >
            Efectivo
          </div>
        </div>
        <div className='flex flex-col gap-4 py-10'>
          {optionSelected === 1 && (
            <span>
              Serás redirigido a la página de Mercado Pago para que puedas
              abonar la reserva
            </span>
          )}
          {optionSelected === 2 && (
            <span> Abonaras en efectivo al momento de estacionar </span>
          )}
          {optionSelected === 1 && (
            <span>
              Serás redirigido a la página de Mercado Pago para que puedas
              abonar la reserva
            </span>
          )}
          {optionSelected === 2 && (
            <span> Abonaras en efectivo al momento de estacionar </span>
          )}
        </div>

        <div className='flex flex-col gap-3 fixed bottom-10 inset-x-0 px-4'>
          <button
            type='button'
            className={`py-2 text-center ${
              isLoading ? 'bg-[#FFE9CC]' : 'bg-[#D58418]'
            } rounded-3xl font-semibold w-full disabled:bg-[#5b57517e]`}
            onClick={onsubmit}
            disabled={optionSelected === 0}
          >
            {isLoading ? <LoadingIcon width={16} /> : 'Confirmar'}
          </button>

          <Link
            to={'/'}
            type='button'
            className='py-2 text-center bg-white border border-[#D58418] rounded-3xl font-semibold'
          >
            Cancelar
          </Link>
        </div>
      </div>
    </>
  );
};
