import { twJoin } from 'tailwind-merge';
import type { Mode } from '../types/types';

type Props = {
  currentMode: Mode;
};

export function ModeNav({ currentMode }: Props) {
  return (
    <div className='absolute right-0 bottom-10 left-0 flex items-center justify-between px-3 font-[aclonica]'>
      <div
        // onClick={() => setCurrentMode('short_break')}
        className={twJoin(
          'inline-block',
          currentMode === 'short_break'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.3)]',
        )}
      >
        short break
      </div>
      <div
        className={twJoin(
          'inline-block',
          currentMode === 'pomodoro'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.3)]',
        )}
        // onClick={() => setCurrentMode('pomodoro')}
      >
        pomodoro
      </div>
      <div
        className={twJoin(
          'inline-block',
          currentMode === 'long_break'
            ? 'text-[20px] text-[#020f55]'
            : 'text-[15px] text-[rgba(0,0,0,0.3)]',
        )}
        // onClick={() => setCurrentMode('long_break')}
      >
        long break
      </div>
    </div>
  );
}
