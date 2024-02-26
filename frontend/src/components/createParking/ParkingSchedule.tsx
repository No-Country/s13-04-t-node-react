import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleIItem from './ScheduleIItem';
import { useFormContext } from 'react-hook-form';
import { Inputs } from '../../pages/register-parking/AddNewParking';

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function ScheduleForm({ setStep }: Props) {
  const { getValues, setValue } = useFormContext();
  const next = () => {
    const schedule = getValues('schedule') as Inputs['schedule'];


    const filteredSchedule = Object.fromEntries(
      Object.entries(schedule).filter(([, value]) => {
        value.schedule.forEach((item, index) => item.end === null && item.start === null && value.schedule.splice(index, 1));
        const hasValidSchedule = value.schedule.length > 0;
        const hasValidStartAndEnd = value.schedule.every(hour => (hour.start !== null && hour.end !== null));
        return hasValidSchedule && hasValidStartAndEnd;
      })
    );
    setValue('schedule', filteredSchedule);
    setStep(3);
  };
  const navigation = useNavigate();
  return (
    <section className='flex flex-col gap-3'>
      <h2 className='text-xl' >HORARIO</h2>
      <p className='text-base  '>Selecciona los días y horarios de funcionamiento</p>
      {daysOfWeek.map((day, index) =>
        <ScheduleIItem index={index} schedule={day} />
      )}
      <button
        className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
        type='button'
        onClick={next}
      >
        Siguiente
      </button>
      <button
        className='border rounded-3xl p-2 font-bold text-center'
        type='button'
        onClick={(e) => {
          e.preventDefault();
          navigation('/registro');
        }}
      >
        cancelar
      </button>
    </section>
  );
}