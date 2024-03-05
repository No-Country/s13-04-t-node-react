import React from 'react';
import ScheduleIItem from './ScheduleIItem';
import { useFormContext } from 'react-hook-form';
import { CreateGaraje } from '../../types/garage';

const daysOfWeek = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function ScheduleForm({ setStep }: Props) {
  const { getValues, setValue, handleSubmit } = useFormContext();
  const next = () => {
    const schedule = getValues('schedule') as CreateGaraje['schedule'];

    const filteredSchedule = Object.fromEntries(
      Object.entries(schedule).filter(([, value]) => {
        value.schedule.forEach(
          (item, index) =>
            item.end === null &&
            item.start === null &&
            value.schedule.splice(index, 1)
        );
        const hasValidSchedule = value.schedule.length > 0;
        const hasValidStartAndEnd = value.schedule.every(
          (hour) => hour.start !== null && hour.end !== null
        );
        return hasValidSchedule && hasValidStartAndEnd;
      })
    );
    setValue('schedule', filteredSchedule);
    setStep(3);
  };
  return (
    <section className='flex flex-col gap-3'>
      <h2 className='text-xl'>HORARIO</h2>
      <p className='text-base  '>
        Selecciona los días y horarios de funcionamiento
      </p>
      {daysOfWeek.map((day, index) => (
        <div
          key={`schedule-${index}`}
          className='grid grid-cols-12 place-items-start gap-2 text-lg my-2 '
        >
          <ScheduleIItem index={index} schedule={day} />
        </div>
      ))}
      <button
        className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
        type='button'
        onClick={handleSubmit(next)}
      >
        Siguiente
      </button>
      <button
        className='border border-[#D58418]  rounded-3xl p-2 font-bold text-center w-full my-4 max-w-[600px] mx-auto'
        type='button'
        onClick={(e) => {
          e.preventDefault();
          setStep(0);
        }}
      >
        cancelar
      </button>
    </section>
  );
}
