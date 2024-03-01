import { Fragment } from 'react';
import { ModalCalendary } from './ModalCalendary';

interface ScheduleProps {
  schedule: Record<string, { name: string; schedule: { start: string; end: string }[] }>;
  excludeDays: Date[]
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, excludeDays }) => {


  return (
    <section className="w-full">
      <ul className="grid grid-cols-2 ">
        {schedule && Object.values(schedule).map((day, index) => (
          <Fragment key={index}>
            <li className="text-left">
              <strong>{day.name}:</strong>
            </li>
            <li className="text-left">
              {day.schedule.map((time, idx) => (
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
      <div className="flex items-center justify-items-start">
        <ModalCalendary exclideDays={excludeDays} />
      </div>
    </section>
  );
};

export default Schedule;
