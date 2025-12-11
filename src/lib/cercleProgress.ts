import type { Dispatch, RefObject, SetStateAction } from 'react';
import { App } from '@capacitor/app';
import type { Mode, ScheduleItem, State } from '../types/types';

export async function circleProgressHandler({
  progress,
  fullProgress,
  scheduleRef,
  setProgress,
  progressStep,
  interval,
  setState,
  setCurrentMode,
  setCurrentTimeEnd,
}: {
  progress: number;
  fullProgress: number;
  scheduleRef: RefObject<ScheduleItem[]>;
  setProgress: Dispatch<SetStateAction<number>>;
  progressStep: number;
  interval: number | null;
  setState: Dispatch<SetStateAction<State>>;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  setCurrentTimeEnd: Dispatch<SetStateAction<number | null>>;
}): Promise<void> {
  console.log('🚀 ~ 2.1');
  // console.log('🚀 ~ scheduleRef.current', scheduleRef.current);
  const { isActive } = await App.getState();
  if (!isActive) return;
  if (progress < fullProgress) {
    console.log('🚀 ~ 3');
    if (scheduleRef.current[0]?.timeEnd) {
      console.log('🚀 ~ 4');
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
      // scheduleRef.current.shift();
      scheduleRef.current = scheduleRef.current.filter(
        (item) => item.timeEnd > Date.now(),
      );
      setCurrentMode(scheduleRef.current[0].mode);
      setCurrentTimeEnd(scheduleRef.current[0]?.timeEnd || null);
      setProgress(0);
    }
  }
}
