import styles from './styles.module.css';
import { ProgressCircle } from '../ProgressCircle';
import type { Durations, Mode, ScheduleItem, State } from '../../types/types';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { twJoin } from 'tailwind-merge';

type Props = {
  state: State;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  durations: Durations;
  isRepeatOn: boolean;
  setState: Dispatch<SetStateAction<State>>;
  scheduleRef: RefObject<ScheduleItem[]>;
  currentTimeEnd: number | null;
  setCurrentTimeEnd: Dispatch<SetStateAction<number | null>>;
};

export function CircleBase({
  state,
  progress,
  setProgress,
  currentMode,
  setCurrentMode,
  durations,
  isRepeatOn,
  setState,
  scheduleRef,
  currentTimeEnd,
  setCurrentTimeEnd,
}: Props) {
  return (
    <div
      className={twJoin(styles.circleBase, state.isSettingsOpen && 'hidden')}
    >
      <ProgressCircle
        setState={setState}
        isRepeatOn={isRepeatOn}
        durations={durations}
        state={state}
        progress={progress}
        setProgress={setProgress}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        scheduleRef={scheduleRef}
        setCurrentTimeEnd={setCurrentTimeEnd}
      />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[poppins] text-3xl font-semibold text-white'>
        {currentTimeEnd
          ? Math.floor((currentTimeEnd - new Date().getTime()) / 60000) +
            1 +
            ' min'
          : currentMode === 'pomodoro'
            ? durations.pom + ' min'
            : currentMode === 'short_break'
              ? durations.short + ' min'
              : durations.long + ' min'}
        {/* {currentMode === 'pomodoro'
          ? durations.pom + ' min'
          : currentMode === 'short_break'
            ? durations.short + ' min'
            : durations.long + ' min'} */}
      </div>
    </div>
  );
}
