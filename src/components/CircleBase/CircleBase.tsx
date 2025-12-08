import styles from './styles.module.css';
import { ProgressCircle } from '../ProgressCircle';
import type { Durations, Mode, State, TimeStartEnd } from '../../App';
import type { Dispatch, SetStateAction } from 'react';
import { twJoin } from 'tailwind-merge';

type Props = {
  state: State;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  timeStartEnd: TimeStartEnd;
  setTimeStartEnd: Dispatch<SetStateAction<TimeStartEnd>>;
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  durations: Durations;
  isRepeatOn: boolean;
  setState: Dispatch<SetStateAction<State>>;
};

export function CircleBase({
  state,
  progress,
  setProgress,
  timeStartEnd,
  setTimeStartEnd,
  currentMode,
  setCurrentMode,
  durations,
  isRepeatOn,
  setState,
}: Props) {
  return (
    <div
      className={twJoin(styles.circleBase, state.isSettingsOpen && 'hidden')}
    >
      <ProgressCircle
        setState={setState}
        isRepeatOn={isRepeatOn}
        durations={durations}
        timeStartEnd={timeStartEnd}
        setTimeStartEnd={setTimeStartEnd}
        state={state}
        progress={progress}
        setProgress={setProgress}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[poppins] text-3xl font-semibold text-white'>
        {timeStartEnd.timeStart && timeStartEnd.timeEnd
          ? Math.floor((timeStartEnd.timeEnd - new Date().getTime()) / 60000) +
            1 +
            ' min'
          : currentMode === 'pomodoro'
            ? durations.pom + ' min'
            : currentMode === 'short_break'
              ? durations.short + ' min'
              : durations.long + ' min'}
      </div>
    </div>
  );
}
