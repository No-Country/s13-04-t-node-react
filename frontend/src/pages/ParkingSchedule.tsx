import { useState } from 'react';
import { HeaderLogo } from '../components/HeaderLogo';
import { Switch } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { schedules } from '../data/schedules';

export const ParkingSchedule = () => {
  const [enabled, setEnabled] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <>
      <HeaderLogo />
      <div className='px-4 py-8'>
        <div className='flex flex-col gap-5'>
          <div>
            <h1 className='text-xl font-semibold'>AÑADIR ESTACIONAMIENTO</h1>
            <p>Completa los datos de tu estacionamiento</p>
          </div>

          <div>
            <h2 className='text-lg font-semibold'>HORARIO</h2>
            <p>Selecciona los días y horarios de funcionamiento</p>
          </div>
        </div>

        <div className='flex flex-col gap-5 py-4'>
          {schedules.map((schedule) => (
            <div key={schedule.id} className='grid grid-cols-6 items-center'>
              <div className='col-span-1 font-semibold text-sm'>
                {schedule.name}
              </div>

              <div className='flex items-center justify-center gap-1 col-span-2'>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-10 items-center rounded-full`}
                >
                  <span className='sr-only'>Enable notifications</span>
                  <span
                    className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>

                <div className='font-semibold text-sm'>
                  {schedule.state.closed}
                </div>
              </div>

              <div className='flex items-center gap-1 justify-between col-span-3'>
                <div className='flex items-center'>
                  <DatePicker
                    className='w-16 px-1'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption='Time'
                    dateFormat='h:mm aa'
                    placeholderText='00:00'
                  />
                  <DatePicker
                    className='w-16'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='h:mm aa'
                    placeholderText='00:00'
                  />
                </div>
                <button type='button'>
                  <img src={schedule.iconAdd} alt='agregar' />
                </button>
              </div>
            </div>
          ))}

          <div className='flex items-center gap-1 justify-end'>
            <div className='flex items-center'>
              <DatePicker
                className='w-16 px-1'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
                placeholderText='00:00'
              />
              <DatePicker
                className='w-16'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='h:mm aa'
                placeholderText='00:00'
              />
            </div>
            <button type='button'>
              <img src='/images/trash.svg' alt='eliminar' />
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 fixed bottom-4 inset-x-0 px-4'>
        <button
          type='submit'
          className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
        >
          Siguiente
        </button>
        <button
          type='button'
          className='py-2 text-center bg-white border border-[#D58418] rounded-3xl font-semibold'
        >
          Cancelar
        </button>
      </div>
    </>
  );
};
