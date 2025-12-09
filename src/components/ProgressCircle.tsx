import {
  useEffect,
  useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import type { Durations, Mode, ScheduleItem, State } from '../types/types';

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
  setCurrentTimeEnd: Dispatch<SetStateAction<number | null>>;
};

export function ProgressCircle({
  state,
  progress,
  setProgress,
  currentMode,
  setCurrentMode,
  durations,
  isRepeatOn,
  setState,
  scheduleRef,
  setCurrentTimeEnd,
}: Props) {
  const interval = useRef<number | null>(null);

  const fullProgress = 749;

  useEffect(() => {
    let progressStep = 0;
    if (scheduleRef.current[0]?.duration) {
      progressStep = fullProgress / (scheduleRef.current[0].duration / 1000);
    }
    console.log('🚀 ~ progressStep:', progressStep);
    if (state.isTimerOn) {
      interval.current = setInterval(() => {
        console.log('🚀 ~ scheduleRef.current', scheduleRef.current);
        if (progress >= fullProgress) {
          if (scheduleRef.current.length === 1 && interval.current) {
            clearInterval(interval.current);
            interval.current = null;
            setProgress(0);
            setState({
              isReset: true,
              isTimerOn: false,
              isSettingsOpen: false,
            });
            setCurrentMode('pomodoro');
          } else {
            scheduleRef.current.shift();
            setCurrentMode(scheduleRef.current[0].mode);

            setCurrentTimeEnd(scheduleRef.current[0]?.timeEnd || null);
            setProgress(0);
          }
        } else {
          if (scheduleRef.current[0]?.timeEnd) {
            setProgress(
              fullProgress -
                ((scheduleRef.current[0].timeEnd - Date.now()) / 1000) *
                  progressStep,
            );
          }
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
    durations,
    fullProgress,
    setCurrentTimeEnd,
    scheduleRef,
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
