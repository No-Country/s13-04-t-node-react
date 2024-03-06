import { HeaderLogo } from '../../components/data-driver/HeaderLogo';
import { useEffect, useState } from 'react';
import { IGarage } from '../../types/garage';
import { garageService } from '../../services/garage';
import { payMentService } from '../../services/payment';
import { LoadingIcon } from '../../components/shared/LoadingIcon';
import { useNavigate } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import { bookingService } from '../../services/booking';
import moment from 'moment';
function calcDiff(dateStart: string, dateEnd: string, price_Hour: number) {
  const startMoment = moment(dateStart);
  const endMoment = moment(dateEnd);
  const diff_hours = endMoment.diff(startMoment, 'hours');
  return price_Hour * diff_hours;
}
export const PaymentPage = () => {
  const [searchParams] = useSearchParams();

  const navigation = useNavigate();
  const dataIn = {
    idCar: searchParams.get('idCar') as string,
    idGarage: searchParams.get('idGarage') as string,
    dateStart: searchParams.get('dateStart') as string,
    dateEnd: searchParams.get('dateEnd') as string,
    price: calcDiff(
      searchParams.get('dateStart') as string,
      searchParams.get('dateEnd') as string,
      parseInt(searchParams.get('price') as string)
    ),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [parking, setParking] = useState<IGarage>();
  useEffect(() => {
    garageService
      .getById(searchParams.get('idGarage') as string)
      .then((res) => {
        setParking(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [optionSelected, setOptionSelected] = useState<number>(0);

  const onsubmit = () => {
    setIsLoading(true);
    if (optionSelected === 2) {
      bookingService.createBooking(dataIn).then((res) => {
        if (res.status === 201) {
          navigation(`/efectivo-pago/${res.data.booking.id}`);
        }
      });
    } else if (optionSelected === 1) {
      payMentService.payMercadoPago(dataIn).then((res) => {
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
        <span className='font-semibold text-lg'>Pago</span>
        <div className='flex items-center justify-between py-6 text-lg'>
          <span>Total a abonar:</span>
          <span className='font-semibold'>${dataIn.price}</span>
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
