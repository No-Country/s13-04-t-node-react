import { useState } from 'react';
import { useCurrentUser } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { FavoriteGarages } from '../../components/home-driver/FavoriteGarages';
import { ParticularGarages } from '../../components/home-driver/ParticularGarages';
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

export const HomeDriver = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');

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
    <>
      <div className='px-4 py-8'>
        <h1 className='uppercase text-2xl pb-8'>¡HOLA, {user.name}!</h1>

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
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
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
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
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
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
              placeholderText='¿Hasta cuándo querés estacionar?'
              required
            />
          </div>

          <button
            type='submit'
            className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center mt-2'
          >
            Buscar
          </button>
        </form>
      </div>

      <FavoriteGarages />
      <ParticularGarages />

      <div className='px-4 py-8'>
        <div className='flex justify-between gap-10 bg-[#D9D9D9] px-8 py-2 rounded-md'>
          <img src='/images/location.svg' alt='localizacion' />
          <div>
            <h4 className='text-xl font-semibold'>Ver mapa</h4>
            <p>Ubica los estacionamientos cercanos</p>
          </div>
        </div>
      </div>
    </>
  );
};
