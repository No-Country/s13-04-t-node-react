import { CardCarSelection } from '../../components/book-page/CardCarSelection';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { BiSolidDownArrow } from 'react-icons/bi';
import {
  addHours,
  addMilliseconds,
  getDay,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
} from 'date-fns';
import { NotFound } from '../not-found/NotFound';
import useSWR from 'swr';
import { garageService } from '../../services/garage';
import { useState } from 'react';
import { ICar } from '../../types/vehicule';
import { Slide, toast } from 'react-toastify';
import { LoadingIcon } from '../../components/shared/LoadingIcon';

export const CarDateReservation = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<ICar | undefined>();

  const [searchParams, setSearchParams] = useSearchParams();
  const garageId = searchParams.get('garage');

  const { data: garage, error } = useSWR(
    garageId ? [garageId, 'garage'] : null,
    ([garageId]) => garageService.getById(garageId)
  );

  const startDateParam = searchParams.get('start-date');
  const startDate = startDateParam
    ? new Date(startDateParam)
    : addHours(setMinutes(new Date(), 0), 1);
  const setStartDate = (date: Date | null) => {
    searchParams.set('start-date', date?.toISOString() ?? '');
    setSearchParams(searchParams);
  };

  const endDateParam = searchParams.get('end-date');
  const endDate = endDateParam ? new Date(endDateParam) : startDate;
  const setEndDate = (date: Date | null) => {
    searchParams.set('end-date', date?.toISOString() ?? '');
    setSearchParams(searchParams);
  };

  if (!garageId || error) {
    return <NotFound />;
  }

  if (!garage) {
    return (
      <div className='flex min-h-dvh'>
        <LoadingIcon width={50} />
      </div>
    );
  }

  const schedule = garage.schedule;

  const isAvailableWeekday = (date: Date) => {
    const dayOfWeek = getDay(date);
    const scheduleDays = Object.keys(schedule).map(Number);
    return scheduleDays.includes(dayOfWeek);
  };

  const isAvailableTime = (type: 'start' | 'end') => (time: Date) => {
    const selectedDayOfWeek = getDay(type === 'start' ? startDate : endDate);
    const scheduleRange = schedule[selectedDayOfWeek]?.schedule;
    if (!scheduleRange) return false;

    for (const { start, end } of scheduleRange) {
      const [startHour, startMinutes] = start.split(':');
      const startTime = addMilliseconds(
        setHours(setMinutes(time, +startMinutes), +startHour),
        -1
      );

      const [endHour, endMinutes] = end.split(':');
      const endTime = addMilliseconds(
        setHours(setMinutes(time, +endMinutes), +endHour),
        1
      );

      if (isBefore(startTime, time) && isAfter(endTime, time)) {
        return true;
      }
    }

    return false;
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!selectedCar) {
      toast.warn('Debe de elejir un auto!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
      return;
    }

    const checkoutSearchParams = new URLSearchParams({
      idCar: selectedCar.id,
      idGarage: garageId,
      dateStart: startDate.toISOString(),
      dateEnd: endDate.toISOString(),
      price: garage.price + '',
    });
    navigate(`/metodo-de-pago?${checkoutSearchParams}`);
  };
  const maxTime = new Date();
  maxTime.setHours(23);
  maxTime.setMinutes(30);
  return (
    <>
      <HeaderUser />

      <div className='flex-1 flex flex-col'>
        <form className='flex flex-1 flex-col' onSubmit={handleFormSubmit}>
          <div className='p-4'>
            <h1 className='text-xl font-semibold uppercase pb-2'>
              {garage.name}
            </h1>
            <p>Selecciona el vehículo con el que vas a estacionar</p>
            <CardCarSelection
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
            />
          </div>

          <div className='px-4 grid gap-4'>
            <div className='relative flex flex-col w-full'>
              <label className='mb-1'>Hora de inicio de reserva</label>
              <div className='flex flex-col w-full relative'>
                <BiSolidDownArrow className='absolute top-2 right-2 z-30' />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (endDate && date && isBefore(endDate, date)) {
                      setEndDate(date);
                    }
                  }}
                  filterDate={isAvailableWeekday}
                  filterTime={isAvailableTime('start')}
                  showTimeSelect
                  dateFormat='d MMMM, yyyy h:mm aa'
                  minDate={new Date()}
                  className='px-4 py-1 border border-[#D58418] rounded-lg w-full outline-none placeholder:text-black font-semibold'
                  required
                />
              </div>
            </div>

            <div className='relative flex flex-col w-full'>
              <label className='mb-1'>Hora de finalización de reserva</label>
              <div className='flex flex-col w-full relative'>
                <BiSolidDownArrow className='absolute top-2 right-2 z-30' />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  filterDate={isAvailableWeekday}
                  filterTime={isAvailableTime('end')}
                  dateFormat='d MMMM, yyyy h:mm aa'
                  minDate={startDate}
                  // maxDate={startDate}
                  minTime={startDate ?? undefined}
                  maxTime={maxTime}
                  className='px-4 py-1 border border-[#D58418] rounded-lg w-full outline-none placeholder:text-black font-semibold'
                  required
                />
              </div>
            </div>
          </div>

          <div className='p-4 flex flex-col gap-3 sticky bottom-0 inset-x-0 mt-auto bg-white'>
            <button
              type='submit'
              className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold w-full'
            >
              Guardar
            </button>

            <Link
              to={`/reservar/${garageId}`}
              type='button'
              className='py-2 text-center bg-white border border-[#D58418] rounded-3xl font-semibold'
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
