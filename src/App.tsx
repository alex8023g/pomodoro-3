import './App.css';
import { CircleBase } from './components/CircleBase/CircleBase';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { Header } from './components/Header';
import { Settings } from './components/Settings/Settings';
import { ModeNav } from './components/ModeNav';

export type Mode = 'pomodoro' | 'short_break' | 'long_break';

export type State = {
  isSettingsOpen: boolean;
  isTimerOn: boolean;
  isReset: boolean;
};

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>('pomodoro');
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState({
    pom: 25,
    short: 5,
    long: 15,
  });
  const [state, setState] = useState({
    isSettingsOpen: false,
    isTimerOn: false,
    isReset: true,
  });
  return (
    <div className='flex h-dvh flex-col justify-between bg-[#50a6d9] bg-[url(/root_bg.png)] bg-cover bg-center'>
      <Header isRepeatOn={isRepeatOn} setIsRepeatOn={setIsRepeatOn} />
      <div className='relative flex h-full flex-col items-center justify-center text-3xl font-bold'>
        {state.isSettingsOpen ? (
          <Settings
            state={state}
            setState={setState}
            durations={durations}
            setDurations={setDurations}
          />
        ) : (
          <CircleBase
            state={state}
            progress={progress}
            setProgress={setProgress}
          />
        )}
        {!state.isSettingsOpen && (
          <ModeNav currentMode={currentMode} setCurrentMode={setCurrentMode} />
        )}
      </div>
      <Footer
        // isSettingsOpen={isSettingsOpen}
        // setIsSettingsOpen={setIsSettingsOpen}
        // isTimerOn={isTimerOn}
        // setIsTimerOn={setIsTimerOn}
        // isReset={isReset}
        // setIsReset={setIsReset}
        state={state}
        setState={setState}
        setProgress={setProgress}
      />
    </div>
  );
}

export default App;
