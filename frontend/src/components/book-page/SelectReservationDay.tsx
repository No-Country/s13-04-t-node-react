import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';

const people = [
  { id: 1, name: 'Lun, 19 de febrero', unavailable: false },
  { id: 2, name: 'Mar, 20 de febrero', unavailable: false },
  { id: 3, name: 'Mie, 21 de febrero', unavailable: false },
  { id: 4, name: 'Jue, 22 de febrero', unavailable: true },
  { id: 5, name: 'Vie, 23 de febrero', unavailable: false },
  { id: 6, name: 'Sab, 24 de febrero', unavailable: false },
  { id: 7, name: 'Dom, 25 de febrero', unavailable: false },
  { id: 8, name: 'Therese Wunsch', unavailable: false },
  { id: 9, name: 'Benedict Kessler', unavailable: true },
  { id: 10, name: 'Katelyn Rohan', unavailable: false },
];

export const SelectReservationDay = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className='flex flex-col w-full gap-2'>
      <label>Día de reserva</label>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <div className='relative'>
          <Listbox.Button className='flex items-center justify-between px-4 w-full rounded-md bg-white py-1.5 ring-2 ring-[#D58418] focus:outline-none text-sm'>
            <p>Selección que día queres estacionar</p>
            {/* <BiSolidUpArrow /> */}
            <BiSolidDownArrow />
            {/* {selectedPerson.name} */}
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute top-full mt-2 inset-x-0 max-h-60 w-full rounded-md bg-white py-2 text-base ring-2 ring-[#D58418] focus:outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#D58418] scrollbar-track-slate-700 z-10'>
              {people.map((person) => (
                <Listbox.Option
                  className='px-4 py-1'
                  key={person.id}
                  value={person}
                  disabled={person.unavailable}
                >
                  {person.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
