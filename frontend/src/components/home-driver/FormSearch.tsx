import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Combobox, Transition } from '@headlessui/react';
import useSWR from 'swr';
import { garageService } from '../../services/garage';

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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams({
      place: query,
      'start-date': startDate?.toISOString() ?? '',
      'end-date': endDate?.toISOString() ?? '',
    });
    navigate(`/resultados-garajes?${searchParams}`);
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={onSubmit}>
      <div className='grid gap-4'>
        <SearchBox query={query} setQuery={setQuery} />

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
      </div>

      <div className='mt-1 mb-5'>
        <button
          type='submit'
          className='px-3 py-1 font-semibold rounded-3xl w-full border bg-[#D58418] text-center'
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

interface SearchBoxProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({ query, setQuery }: SearchBoxProps) => {
  const { data: results = [] } = useSWR(['autocomplete', query], () =>
    garageService.autocomplete(query)
  );

  const [selectedResult, setSelectedResult] = useState<string>(results[0]);

  const filteredResult =
    query === ''
      ? results
      : results.filter((result) => {
          return result.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedResult} onChange={setSelectedResult}>
      <div className='relative'>
        <img
          src='/images/search.svg'
          alt='search'
          className='absolute top-2 left-4'
        />

        <Combobox.Input
          className='px-10 py-1 border border-[#D58418] rounded-lg w-full outline-none placeholder:text-black font-semibold'
          placeholder='¿Dónde querés estacionar?'
          onChange={(event) => setQuery(event.target.value)}
        />

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Combobox.Options className='top-full mt-2 inset-x-0 max-h-48 w-full rounded-md bg-white py-2 text-base ring-1 ring-[#D58418] focus:outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#D58418] scrollbar-track-slate-700 z-10'>
            {filteredResult.map((result) => (
              <Combobox.Option
                key={result}
                value={result}
                className='px-4 py-1'
              >
                {result}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
