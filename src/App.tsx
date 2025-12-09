import './App.css';
import { CircleBase } from './components/CircleBase/CircleBase';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { Header } from './components/Header';
import { Settings } from './components/Settings/Settings';
import { ModeNav } from './components/ModeNav';
import { deviceStorage } from './deviceStorage';
import type { Durations, Mode, TimeStartEnd } from './types';

const isRepeatOnDevStorage = await deviceStorage.getIsRepeatOn();
const durationsDevStorage = await deviceStorage.getDurations();

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>('pomodoro');
  const [isRepeatOn, setIsRepeatOn] = useState<boolean>(isRepeatOnDevStorage);
  const [progress, setProgress] = useState(0);
  const [timeStartEnd, setTimeStartEnd] = useState<TimeStartEnd>({
    timeStart: null,
    timeEnd: null,
  });
  const [durations, setDurations] = useState<Durations>(durationsDevStorage);
  const [state, setState] = useState({
    isSettingsOpen: false,
    isTimerOn: false,
    isReset: true,
  });
  return (
    <div className='flex h-dvh flex-col justify-between bg-[#50a6d9] bg-[url(/root_bg.png)] bg-cover bg-center'>
      <Header isRepeatOn={isRepeatOn} setIsRepeatOn={setIsRepeatOn} />
      <div className='relative flex h-full flex-col items-center justify-center text-3xl font-bold'>
        {state.isSettingsOpen && (
          <Settings
            state={state}
            setState={setState}
            durations={durations}
            setDurations={setDurations}
          />
        )}
        <CircleBase
          state={state}
          progress={progress}
          setProgress={setProgress}
          timeStartEnd={timeStartEnd}
          setTimeStartEnd={setTimeStartEnd}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          durations={durations}
          isRepeatOn={isRepeatOn}
          setState={setState}
        />
        {!state.isSettingsOpen && (
          <ModeNav currentMode={currentMode} setCurrentMode={setCurrentMode} />
        )}
      </div>
      <Footer
        state={state}
        setState={setState}
        setProgress={setProgress}
        setTimeStartEnd={setTimeStartEnd}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        durations={durations}
      />
    </div>
  );
}

export default App;
