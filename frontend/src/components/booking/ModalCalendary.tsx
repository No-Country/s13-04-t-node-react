import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IGarage } from '../../types/garage';
import {
  addMilliseconds,
  getDay,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
} from 'date-fns';
import { Link } from 'react-router-dom';

interface ModalCalendaryProps {
  garage: IGarage;
}

export const ModalCalendary: React.FC<ModalCalendaryProps> = ({ garage }) => {
  const { schedule } = garage;
  const [isOpen, setIsOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | null>(new Date());

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const onChange = (date: Date) => {
    setBookingDate(date);
  };

  const isAvailableWeekday = (date: Date) => {
    const dayOfWeek = getDay(date);
    const scheduleDays = Object.keys(schedule).map(Number);
    return scheduleDays.includes(dayOfWeek);
  };

  const isAvailableTime = (time: Date) => {
    const selectedDayOfWeek = getDay(bookingDate ?? new Date());
    const scheduleRange = schedule[selectedDayOfWeek]?.schedule;
    if (!scheduleRange) return false;

    for (const { start, end } of scheduleRange) {
      const [startHour, startMinutes] = start.split(':');
      const startDate = addMilliseconds(
        setHours(setMinutes(time, +startMinutes), +startHour),
        -1
      );

      const [endHour, endMinutes] = end.split(':');
      const endDate = addMilliseconds(
        setHours(setMinutes(time, +endMinutes), +endHour),
        1
      );

      if (isBefore(startDate, time) && isAfter(endDate, time)) {
        return true;
      }
    }

    return false;
  };

  const reservationSearchParams = new URLSearchParams({
    'start-date': bookingDate?.toISOString() ?? '',
    garage: garage.id,
  });
  const reservationUrl = `/reservar-horario-vehiculo?${reservationSearchParams.toString()}`;

  return (
    <>
      <div className='inset-0 flex items-center justify-center '>
        <img
          className='h-6 w-6'
          src='/images/reserva-icon.svg'
          alt='reserva icon'
        />
        <button
          type='button'
          onClick={openModal}
          className='flex items-center py-4 text-black'
        >
          Ver disponibilidad
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 px-3 text-center align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 mb-3'
                  >
                    Fechas disponibles
                  </Dialog.Title>
                  <DatePicker
                    selected={bookingDate}
                    minDate={new Date()}
                    onChange={onChange}
                    showTimeSelect
                    filterDate={isAvailableWeekday}
                    filterTime={isAvailableTime}
                    monthsShown={1}
                    inline
                  />

                  <div className='flex items-center justify-center gap-2 mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    <Link
                      to={reservationUrl}
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    >
                      Reservar
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
