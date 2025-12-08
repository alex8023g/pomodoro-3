import type { Dispatch, SetStateAction } from 'react';
import type { State } from '../App';

type Props = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  setProgress: Dispatch<SetStateAction<number>>;
};

export function Footer({
  // isSettingsOpen,
  // setIsSettingsOpen,
  // isTimerOn,
  // setIsTimerOn,
  // isReset,
  // setIsReset,
  state,
  setState,
  setProgress,
}: Props) {
  return (
    <footer className='/border flex h-30 items-center justify-center bg-[url(/footer_frame.png)] bg-cover bg-center'>
      <div className='relative flex w-full items-center justify-between px-10'>
        <button
          onClick={() => {
            if (!state.isReset) {
              setState({
                isReset: true,
                isTimerOn: false,
                isSettingsOpen: false,
              });
              setProgress(0);
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
        <button
          className='relative bottom-10 -left-1.5'
          onClick={() => {
            if (!state.isTimerOn) {
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
