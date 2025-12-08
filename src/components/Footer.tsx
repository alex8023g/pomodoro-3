import type { Dispatch, SetStateAction } from 'react';
import type { Durations, Mode, State, TimeStartEnd } from '../App';

type Props = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setTimeStartEnd: Dispatch<SetStateAction<TimeStartEnd>>;
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  durations: Durations;
};

export function Footer({
  state,
  setState,
  setProgress,
  setTimeStartEnd,
  currentMode,
  setCurrentMode,
  durations,
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
              setTimeStartEnd({
                timeStart: null,
                timeEnd: null,
              });
              setCurrentMode('pomodoro');
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
              const timeStamp = Date.now();
              let timeEnd = 0;
              if (currentMode === 'pomodoro') {
                timeEnd = timeStamp + durations.pom * 60 * 1000;
              } else if (currentMode === 'short_break') {
                timeEnd = timeStamp + durations.short * 60 * 1000;
              } else if (currentMode === 'long_break') {
                timeEnd = timeStamp + durations.long * 60 * 1000;
              }
              setTimeStartEnd({
                timeStart: timeStamp,
                timeEnd: timeEnd,
              });
              setState({
                isReset: false,
                isTimerOn: true,
                isSettingsOpen: false,
              });
            } else {
              setState({
                isReset: false,
                isTimerOn: false,
                isSettingsOpen: false,
              });
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
