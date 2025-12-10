import {
  useEffect,
  // useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import type { Durations, Mode, ScheduleItem, State } from '../types/types';
import { App } from '@capacitor/app';

let interval: number | null = null;

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
  // const interval = useRef<number | null>(null);

  const fullProgress = 749;

  useEffect(() => {
    console.log('🚀 ~ useEffect start');
    let progressStep = 0;
    if (scheduleRef.current[0]?.duration) {
      console.log('🚀 ~ 1');
      progressStep = fullProgress / (scheduleRef.current[0].duration / 1000);
    }
    // console.log('🚀 ~ progressStep:', progressStep);
    if (state.isTimerOn) {
      console.log('🚀 ~ 2');
      interval = setInterval(async () => {
        console.log('🚀 ~ 2.1');
        // console.log('🚀 ~ scheduleRef.current', scheduleRef.current);
        if (progress < fullProgress) {
          console.log('🚀 ~ 3');
          if (scheduleRef.current[0]?.timeEnd) {
            console.log('🚀 ~ 4');
            const { isActive } = await App.getState();
            if (isActive) {
              console.log('🚀 ~ 5');
              setProgress(
                fullProgress -
                  ((scheduleRef.current[0].timeEnd - Date.now()) / 1000) *
                    progressStep,
              );
            }
          }
        } else {
          console.log('🚀 ~ 6');
          if (scheduleRef.current.length === 1 && interval) {
            console.log('🚀 ~ 7');
            clearInterval(interval);
            interval = null;
            console.log('🚀 ~ 7.1');
            setProgress(0);
            setState({
              isReset: true,
              isTimerOn: false,
              isSettingsOpen: false,
            });
            setCurrentMode('pomodoro');
          } else {
            console.log('🚀 ~ 8');
            scheduleRef.current.shift();
            setCurrentMode(scheduleRef.current[0].mode);
            setCurrentTimeEnd(scheduleRef.current[0]?.timeEnd || null);
            setProgress(0);
          }
        }
      }, 1000);
      console.log('🚀 ~ 9');
    } else {
      console.log('🚀 ~ 10');
      setState({
        isReset: true,
        isTimerOn: false,
        isSettingsOpen: false,
      });
      if (interval) {
        console.log('🚀 ~ 11');
        clearInterval(interval);
        interval = null;
      }
    }
    return () => clearInterval(interval as number);
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
