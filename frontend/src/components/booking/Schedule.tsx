import { Fragment } from 'react';
import { ModalCalendary } from './ModalCalendary';
import { IGarage } from '../../types/garage';

interface ScheduleProps {
  schedule: IGarage['schedule'];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  return (
    <section className='w-full'>
      <ul className='grid grid-cols-2 '>
        {Object.values(schedule).map((day) => (
          <Fragment key={day.name}>
            <li className='text-left'>
              <strong>{day.name}:</strong>
            </li>
            <li className='text-left'>
              {day.schedule.map((time, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={idx}>
                  <span>{`${time.start} - ${time.end}`}</span>
                  {idx !== day.schedule.length - 1 && <span>, </span>}
                </div>
              ))}
            </li>
          </Fragment>
        ))}
        {/* Inserta aquí el código para mostrar los horarios */}
      </ul>
      {/* Enlace de disponibilidad */}
      <div className='flex items-center justify-items-start'>
        <ModalCalendary schedule={schedule} />
      </div>
    </section>
  );
};

export default Schedule;
