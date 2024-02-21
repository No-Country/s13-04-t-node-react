import { useState } from 'react';
import { useCurrentUser } from '../../hooks/auth';
import { garageService } from '../../services/garage';
import { CardGaraje } from '../../components/home-driver/CardGaraje';
import { Combobox } from '@headlessui/react';
import useSWR from 'swr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

export const HomeDriver = () => {
  const user = useCurrentUser();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { data: garages } = useSWR(['garage'], () => garageService.list());
  const filteredGarages = garages;

  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className='px-4 py-8'>
        <h1 className='uppercase text-2xl pb-8'>¡HOLA, {user.name}!</h1>

        <div className='flex flex-col gap-3'>
          <div className='relative'>
            <img
              src='/images/search.svg'
              alt='search'
              className='absolute top-2 left-4'
            />
            <input
              type='text'
              className='px-10 py-1 border border-black rounded-lg w-full outline-none placeholder:text-black font-semibold'
              placeholder='¿Dónde querés estacionar?'
            />

            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Options>
                {filteredPeople.map((person) => (
                  <Combobox.Option key={person} value={person}>
                    {person}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>

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

          <input
            type='submit'
            className='px-3 py-1 font-semibold rounded-lg w-full border bg-[#D9D9D9] text-center mt-2'
            value='Buscar'
          />
        </div>
      </div>

      <div className='px-4 pb-6'>
        <h2 className='font-semibold pb-2 text-xl'>
          Estacionamientos favoritos
        </h2>
        <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
          {filteredGarages?.map((garage) => (
            <CardGaraje key={garage.id} garage={garage} />
          ))}
        </ul>
      </div>

      <div className='px-4'>
        <h2 className='font-semibold pb-2 text-xl'>
          Particulares recomendados
        </h2>
        <ul className='flex overflow-x-auto items-center w-auto scrollbar-hidden gap-x-4'>
          {filteredGarages?.map((garage) => (
            <CardGaraje key={garage.id} garage={garage} />
          ))}
        </ul>
      </div>

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
