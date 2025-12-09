import { twJoin } from 'tailwind-merge';
import type { Dispatch, SetStateAction } from 'react';
import type { Mode } from '../types/types';

type Props = {
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
};

export function ModeNav({ currentMode, setCurrentMode }: Props) {
  return (
    <div className='absolute right-0 bottom-10 left-0 flex justify-between px-3 font-[aclonica]'>
      <button
        onClick={() => setCurrentMode('short_break')}
        className={twJoin(
          currentMode === 'short_break'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.3)]',
        )}
      >
        short break
      </button>
      <button
        className={
          currentMode === 'pomodoro'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.3)]'
        }
        onClick={() => setCurrentMode('pomodoro')}
      >
        pomodoro
      </button>
      <button
        className={
          currentMode === 'long_break'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.3)]'
        }
        onClick={() => setCurrentMode('long_break')}
      >
        long break
      </button>
    </div>
  );
}
