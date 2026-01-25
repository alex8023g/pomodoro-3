import { twJoin } from 'tailwind-merge';
import type { Mode, State } from '../types/types';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  state: State;
};

export function ModeNav({ currentMode, setCurrentMode, state }: Props) {
  return (
    <div className='absolute right-0 bottom-10 left-0 flex items-center justify-between px-3 font-[aclonica] sm:px-10'>
      <button
        onClick={() => {
          if (!state.isTimerOn) {
            setCurrentMode('short_break');
          }
        }}
        className={twJoin(
          'inline-block',
          currentMode === 'short_break'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.1)]',
        )}
      >
        short break
      </button>
      <button
        className={twJoin(
          'inline-block',
          currentMode === 'pomodoro'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.1)]',
        )}
        onClick={() => {
          if (!state.isTimerOn) {
            setCurrentMode('pomodoro');
          }
        }}
      >
        pomodoro
      </button>
      <button
        className={twJoin(
          'inline-block',
          currentMode === 'long_break'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.1)]',
        )}
        onClick={() => {
          if (!state.isTimerOn) {
            setCurrentMode('long_break');
          }
        }}
      >
        long break
      </button>
    </div>
  );
}
