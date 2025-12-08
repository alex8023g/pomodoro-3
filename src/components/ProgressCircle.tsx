import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import type { Durations, Mode, State, TimeStartEnd } from '../App';

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

export function ProgressCircle({
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
  const interval = useRef<number | null>(null);
  const isPomodoroFirst = useRef(true);

  const fullProgress = 749;

  useEffect(() => {
    let progressStep = 0;
    if (timeStartEnd.timeEnd && timeStartEnd.timeStart) {
      progressStep =
        fullProgress / ((timeStartEnd.timeEnd - timeStartEnd.timeStart) / 1000);
    }
    console.log('🚀 ~ progressStep:', progressStep);
    if (state.isTimerOn) {
      interval.current = setInterval(() => {
        if (progress >= fullProgress) {
          if (currentMode === 'pomodoro') {
            if (isPomodoroFirst.current) {
              isPomodoroFirst.current = false;
              setCurrentMode('short_break');
              setTimeStartEnd({
                timeStart: Date.now(),
                timeEnd: Date.now() + durations.short * 60 * 1000,
              });
            } else {
              isPomodoroFirst.current = true;
              setCurrentMode('long_break');
              setTimeStartEnd({
                timeStart: Date.now(),
                timeEnd: Date.now() + durations.long * 60 * 1000,
              });
            }
            setProgress(0);
          } else if (currentMode === 'short_break') {
            setCurrentMode('pomodoro');
            setTimeStartEnd({
              timeStart: Date.now(),
              timeEnd: Date.now() + durations.pom * 60 * 1000,
            });
            setProgress(0);
          } else if (currentMode === 'long_break') {
            setCurrentMode('pomodoro');
            if (isRepeatOn) {
              setProgress(0);
              setTimeStartEnd({
                timeStart: Date.now(),
                timeEnd: Date.now() + durations.pom * 60 * 1000,
              });
            } else {
              setTimeStartEnd({
                timeStart: null,
                timeEnd: null,
              });
              setProgress(0);
              setState({
                isReset: true,
                isTimerOn: false,
                isSettingsOpen: false,
              });
              clearInterval(interval.current as number);
            }
          }
        } else {
          setProgress((prev) => prev + progressStep);
        }
      }, 1000);
      return () => clearInterval(interval.current as number);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  }, [
    state.isTimerOn,
    setProgress,
    progress,
    currentMode,
    setCurrentMode,
    isRepeatOn,
    setState,
    timeStartEnd,
    durations,
    fullProgress,
    setTimeStartEnd,
  ]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  const strokeDasharray = circumference - progress;
  return (
    <div className='1 absolute top-[27px] left-1/2 size-[266px] -translate-x-1/2'>
      <svg className='2 /h-60 /w-60 -rotate-90 transform' viewBox='0 0 260 260'>
        {/* Progress circle */}
        <circle
          cx={130}
          cy={130}
          r={radius}
          stroke='#fff'
          strokeWidth='10'
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDasharray}
          strokeLinecap='round'
          className='transition-all duration-1000 ease-linear'
        />
      </svg>
    </div>
  );
}
