import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { CreateGaraje } from '../../types/garage';

interface Props {
  i: number;
  dayIndex: number;
}

const addZeroToTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

export default function HoursComponent({ i, dayIndex }: Props) {
  const { getValues, setValue } = useFormContext();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  useEffect(() => {
    if (startDate) {
      console.log(startDate.toISOString());

      setValue(
        `schedule.${dayIndex}.schedule[${i}].start`,
        `${addZeroToTime(startDate.getHours())}:${addZeroToTime(
          startDate.getMinutes()
        )}`
      );
    } else {
      setValue(`schedule.${dayIndex}.schedule[${i}].start`, null);
    }
  }, [startDate]);
  useEffect(() => {
    if (endDate) {
      console.log(endDate.toISOString());

      setValue(
        `schedule.${dayIndex}.schedule[${i}].end`,
        `${addZeroToTime(endDate.getHours())}:${addZeroToTime(
          endDate.getMinutes()
        )}`
      );
    } else {
      setValue(`schedule.${dayIndex}.schedule[${i}].end`, null);
    }
  }, [endDate]);
  const maxTime = new Date();
  maxTime.setHours(23);
  maxTime.setMinutes(30);
  return (
    <>
      <DatePicker
        className='w-full text-end'
        selected={startDate}
        onChange={setStartDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption='Time'
        dateFormat='HH:mm'
        timeFormat='HH:mm'
        placeholderText='00:00'
      />
      -
      <DatePicker
        className='w-full text-start'
        selected={endDate}
        onChange={setEndDate}
        minTime={startDate ?? undefined}
        maxTime={maxTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption='Time'
        timeFormat='HH:mm'
        dateFormat='HH:mm'
        placeholderText='00:00'
      />
      {i !== 0 ? (
        <button
          className='min-w-[24px]'
          type='button'
          onClick={() => {
            setValue(`schedule.${dayIndex}.schedule`, [
              ...getValues(`schedule.${dayIndex}.schedule`).filter(
                (_: CreateGaraje['schedule'], itemIndex: number) =>
                  itemIndex !== i
              ),
            ]);
          }}
        >
          <img src='/images/trash.svg' className='' />
        </button>
      ) : (
        <button
          className='min-w-[24px] '
          type='button'
          onClick={() => {
            setValue(`schedule.${dayIndex}.schedule`, [
              ...getValues(`schedule.${dayIndex}.schedule`),
              { end: null, start: null },
            ]);
          }}
        >
          <img src='/images/add.svg' className='' />
        </button>
      )}
    </>
  );
}
