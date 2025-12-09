import { ChevronDownIcon } from '@heroicons/react/16/solid';
import type { Dispatch, SetStateAction } from 'react';
import { deviceStorage } from '../storages/deviceStorage';
import type { Durations } from '../types/types';

type Props = {
  values: number[];
  duration: number;
  setDuration: Dispatch<
    SetStateAction<{ pom: number; short: number; long: number }>
  >;
  durationsKey: keyof Durations;
};

export function SelectDuration({
  values,
  duration,
  setDuration,
  durationsKey,
}: Props) {
  return (
    <>
      {/* <label
        htmlFor='location'
        className='block text-sm/6 font-medium text-gray-900'
      ></label> */}
      <div className='/mt-2 grid grid-cols-1'>
        <select
          id='location'
          name='location'
          value={duration}
          className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/40 py-1.5 pr-8 pl-3 font-[poppins] text-base font-light text-white sm:text-sm/6'
          onChange={(e) => {
            setDuration((prev) => ({
              ...prev,
              [durationsKey]: Number(e.target.value),
            }));

            deviceStorage.updateDurations({
              duration: Number(e.target.value),
              durationsKey,
            });
          }}
        >
          {values.map((value) => (
            <option
              key={value}
              value={value}
              className='text-opacity-10 font-light'
            >
              {String(value).padStart(2, '0')}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden='true'
          className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-white sm:size-4'
        />
      </div>
    </>
  );
}
