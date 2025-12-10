import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { Durations, Mode, ScheduleItem, State } from '../types/types';
import { deviceStorage } from '../storages/deviceStorage';
import { createSchedule } from '../lib/createSchedule';
import { defaultState } from '../constants';
import { scheduleBasicNotification } from '../lib/localNotifications';

type Props = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setCurrentTimeEnd: Dispatch<SetStateAction<number | null>>;
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  durations: Durations;
  isRepeatOn: boolean;
  scheduleRef: RefObject<ScheduleItem[]>;
};

export function Footer({
  state,
  setState,
  setProgress,
  setCurrentTimeEnd,
  // currentMode,
  setCurrentMode,
  durations,
  isRepeatOn,
  scheduleRef,
}: Props) {
  return (
    <footer className='/border flex h-30 items-center justify-center bg-[url(/footer_frame.png)] bg-cover bg-center'>
      <div className='relative flex w-full items-center justify-between px-10'>
        {/* Reset (home) button */}
        <button
          onClick={() => {
            if (!state.isReset) {
              setState({
                isReset: true,
                isTimerOn: false,
                isSettingsOpen: false,
              });
              setProgress(0);
              setCurrentTimeEnd(null);
              setCurrentMode('pomodoro');
              deviceStorage.setState(defaultState);
            }
          }}
        >
          <div className='/border'>
            {state.isReset ? (
              <img src='/iconamoon_home-bold.png' alt='pause button' />
            ) : (
              <img src='/home_off_btn.png' alt='pause button' />
            )}
          </div>
        </button>
        {/* TimerOn button */}
        <button
          className='relative bottom-10 -left-1.5'
          onClick={() => {
            if (!state.isTimerOn) {
              setState({
                isReset: false,
                isTimerOn: true,
                isSettingsOpen: false,
              });
              deviceStorage.setState({
                isReset: false,
                isTimerOn: true,
                isSettingsOpen: false,
              });
              if (state.isReset) {
                const scheduleRes = createSchedule({
                  isRepeatOn: isRepeatOn,
                  durations: durations,
                });
                deviceStorage.setSchedule(scheduleRes);
                scheduleRef.current = scheduleRes;
                console.log(
                  '🚀 ~ Footer ~ schedule:',
                  scheduleRes,
                  scheduleRes.map((item) => ({
                    timeEnd: new Date(item.timeEnd).toISOString(),
                    mode: item.mode,
                  })),
                );

                scheduleBasicNotification({
                  schedule: scheduleRes,
                });
              }
            }
          }}
        >
          {state.isTimerOn ? (
            <img src='/timer_on_btn.png' alt='play button' />
          ) : (
            <img src='/timer_off_btn.png' alt='play button' />
          )}
        </button>
        {/* Settings button */}
        <button
          onClick={() => {
            if (!state.isSettingsOpen) {
              setState({
                ...state,
                isSettingsOpen: true,
              });
            } else {
              setState({
                ...state,
                isSettingsOpen: false,
              });
            }
          }}
        >
          {state.isSettingsOpen ? (
            <img src='/settings_btn_active.png' alt='play button' />
          ) : (
            <img src='/settings_btn.png' alt='play button' />
          )}
        </button>
      </div>
    </footer>
  );
}
