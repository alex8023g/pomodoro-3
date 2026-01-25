import {
  useEffect,
  // useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import type { Mode, ScheduleItem, State } from '../types/types';
import { App } from '@capacitor/app';
import { defaultState } from '../constants';
import { deviceStorage } from '../storages/deviceStorage';
import { circleProgressHandler } from '../lib/cercleProgress';

let interval: number | null = null;

type Props = {
  state: State;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  // durations: Durations;
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
  // durations,
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
      interval = setInterval(
        () =>
          circleProgressHandler({
            progress,
            fullProgress,
            scheduleRef,
            setProgress,
            progressStep,
            interval,
            setState,
            setCurrentMode,
            setCurrentTimeEnd,
          }),
        1000,
      );
      console.log('🚀 ~ 9');
    } else {
      console.log('🚀 ~ 10');
      setState(defaultState);
      deviceStorage.setState(defaultState);
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
    fullProgress,
    setCurrentTimeEnd,
    scheduleRef,
  ]);

  useEffect(() => {
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('🚀 ~ appStateChange:', isActive);
      console.log('🚀 ~ scheduleRef.current!!!!:', scheduleRef.current);
      try {
        if (isActive) {
          console.log('🚀 ~ listener 1');
          scheduleRef.current = scheduleRef.current?.filter(
            (item) => item.timeEnd > Date.now(),
          );
          setCurrentMode(scheduleRef.current?.[0]?.mode || 'pomodoro');
          setCurrentTimeEnd(scheduleRef.current?.[0]?.timeEnd || null);
          if (
            scheduleRef.current?.filter((item) => item.timeEnd > Date.now())
              .length === 0
          ) {
            console.log('🚀 ~ listener 2');
            console.log('🚀 ~ if (scheduleRef.current.length === 0) ');
            setState(defaultState);
            setProgress(0);
            setCurrentMode('pomodoro');
            setCurrentTimeEnd(null);
          } else {
            console.log('🚀 ~ listener 3');
          }
        } else {
          console.log('🚀 ~ listener 4');
        }
        console.log('🚀 ~ listener 5');
      } catch (error) {
        console.log('🚀 ~ error:', error);
      }
    });
  }, [scheduleRef, setCurrentMode, setCurrentTimeEnd, setState, setProgress]);

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
