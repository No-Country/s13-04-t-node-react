import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
type Hours = {
  start: Date | null;
  end: Date | null;
};
interface Props {
  i: number;
  dayIndex: number;
}
export default function HoursComponent({ i, dayIndex }: Props) {
  const { getValues, setValue, } = useFormContext();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  useEffect(() => {
    if (startDate) {
      setValue(`schedule.${dayIndex}.schedule[${i}].start`, `${startDate?.getHours()}:${startDate?.getMinutes() < 10 ? ('0' + startDate?.getMinutes()) : startDate?.getMinutes()}`);
    } else {
      setValue(`schedule.${dayIndex}.schedule[${i}].start`, null);
    }
  }, [startDate]);
  useEffect(() => {
    if (endDate) {
      setValue(`schedule.${dayIndex}.schedule[${i}].end`, `${endDate?.getHours()}:${endDate?.getMinutes() < 10 ? ('0' + endDate?.getMinutes()) : endDate?.getMinutes()}`);
    } else {
      setValue(`schedule.${dayIndex}.schedule[${i}].end`, null);
    }
  }, [endDate]);
  return (
    <div key={`hour-${i}`} className='flex items-center justify-center gap-1'>
      <DatePicker
        className='w-full text-end'
        selected={startDate}
        onChange={setStartDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption='Time'
        dateFormat='HH:mm aa'
        placeholderText='00:00'
      />-
      <DatePicker
        className='w-full text-start'
        selected={endDate}
        onChange={setEndDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption='Time'
        dateFormat='HH:mm aa'
        placeholderText='00:00'
      />
      {i !== 0 ?
        <button className='min-w-[24px]' type='button' onClick={() => {
          setValue(`schedule.${dayIndex}.schedule`, [
            ...getValues(`schedule.${dayIndex}.schedule`).filter((_: Hours, itemIndex: number) => itemIndex !== i),
          ]);
        }}>
          <img src='/images/trash.svg' className='' />
        </button>
        :
        <button className='min-w-[24px] ' type='button' onClick={() => {
          setValue(`schedule.${dayIndex}.schedule`, [
            ...getValues(`schedule.${dayIndex}.schedule`),
            { end: null, start: null }
          ]);

        }}>
          <img src='/images/add.svg' className='' />
        </button>
      }
    </div>
  );
}