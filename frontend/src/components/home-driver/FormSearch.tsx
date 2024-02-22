import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { Combobox } from '@headlessui/react';

// const people = [
//   'Durward Reynolds',
//   'Kenton Towne',
//   'Therese Wunsch',
//   'Benedict Kessler',
//   'Katelyn Rohan',
// ];

interface Props {
  initialValues: {
    place: string;
    startDate: Date | null;
    endDate: Date | null;
  };
}

export const FormSearch = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(
    initialValues.startDate
  );
  const [endDate, setEndDate] = useState<Date | null>(initialValues.endDate);

  const [query, setQuery] = useState(initialValues.place);

  // const [selectedPerson, setSelectedPerson] = useState(people[0]);

  // const filteredPeople =
  //   query === ''
  //     ? people
  //     : people.filter((person) => {
  //         return person.toLowerCase().includes(query.toLowerCase());
  //       });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams({
      place: query,
      'start-date': startDate?.toISOString() ?? '',
      'end-date': endDate?.toISOString() ?? '',
    });
    navigate(`/resultados-garages?${searchParams}`);
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={onSubmit}>
      <div className='relative'>
        <img
          src='/images/search.svg'
          alt='search'
          className='absolute top-2 left-4'
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type='text'
          className='px-10 py-1 border border-[#D58418] rounded-lg w-full outline-none placeholder:text-black font-semibold'
          placeholder='¿Dónde querés estacionar?'
        />
      </div>
      {/* <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <div className='relative'>
              <img
                src='/images/search.svg'
                alt='search'
                className='absolute top-2 left-4'
              />
              <Combobox.Input
                className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
                placeholder='¿Dónde querés estacionar?'
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <Combobox.Options>
              {filteredPeople.map((person) => (
                <Combobox.Option key={person} value={person}>
                  {person}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox> */}

      <div className='relative flex flex-col w-full'>
        <img
          src='/images/calendario.svg'
          alt='calendario'
          className='absolute left-2 z-10'
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat='d MMMM, yyyy h:mm aa'
          minDate={new Date()}
          className='px-10 py-1 border border-[#D58418] rounded-lg w-full outline-none placeholder:text-black font-semibold'
          placeholderText='¿Cuándo querés estacionar?'
          required
        />
      </div>

      <div className='relative flex flex-col w-full'>
        <img
          src='/images/calendarioV2.svg'
          alt='calendario'
          className='absolute left-2 z-10'
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat='d MMMM, yyyy h:mm aa'
          minDate={new Date()}
          className='px-10 py-1 border border-[#D58418] rounded-lg w-full outline-none placeholder:text-black font-semibold'
          placeholderText='¿Hasta cuándo querés estacionar?'
          required
        />
      </div>

      <button
        type='submit'
        className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center mt-2 mb-4'
      >
        Buscar
      </button>
    </form>
  );
};
