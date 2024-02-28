import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import HoursComponent from './HoursComponent';
import { CreateGaraje } from '../../types/garage';

interface Props {
  index: number;
  schedule: string;
}
export default function ScheduleIItem({ index, schedule }: Props) {
  const { setValue, watch } = useFormContext();
  const [enabled, setEnabled] = useState(false);
  const hours = watch(`schedule.${index}.schedule`);
  return (
    <>
      <div className='col-span-3 '>
        <p className=''>
          {schedule}
        </p>
      </div>
      <div className='flex items-center justify-center gap-1 col-span-4'>
        <Switch
        key={`switch-${index}`}
          checked={enabled}
          onChange={(e) => {
            if (e) {
              setValue(`schedule.${index}.schedule`, [
                { end: null, start: null }
              ]);
              setEnabled(true);
            } else {
              setValue(`schedule.${index}.schedule`, []);
              setEnabled(false);
            }
          }}
          className={`${enabled ? 'bg-[#5D2B2C]' : 'bg-[#5B5751]'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className='sr-only'>Enable notifications</span>
          <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>

        <div>
          {enabled ? 'Abierto' : 'Cerrado'}
        </div>
      </div>

      <div className='flex items-center gap-1 justify-between flex-col w-fit col-span-5'>
        {hours.map((_: CreateGaraje['schedule'], i: number) =>
        <div key={`hour-${i}`} className='flex items-center justify-center gap-1'>
          <HoursComponent i={i} dayIndex={index} />
        </div>
        )}
      </div>
    </>

  );
}

