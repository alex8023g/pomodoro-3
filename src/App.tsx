import './App.css';
import { CircleBase } from './components/CircleBase/CircleBase';
import { Footer } from './components/Footer';
import { useRef, useState } from 'react';
import { Header } from './components/Header';
import { Settings } from './components/Settings/Settings';
import { ModeNav } from './components/ModeNav';
import { deviceStorage } from './storages/deviceStorage';
import type { Durations, Mode, ScheduleItem } from './types/types';

const isRepeatOnDevStorage = await deviceStorage.getIsRepeatOn();
const durationsDevStorage = await deviceStorage.getDurations();
const scheduleDevStorage = await deviceStorage.getSchedule();
const stateDevStorage = await deviceStorage.getState();

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(
    scheduleDevStorage[0]?.mode || 'pomodoro',
  );
  const [currentTimeEnd, setCurrentTimeEnd] = useState<number | null>(
    scheduleDevStorage[0]?.timeEnd || null,
  );
  const [isRepeatOn, setIsRepeatOn] = useState<boolean>(isRepeatOnDevStorage);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<Durations>(durationsDevStorage);
  const [state, setState] = useState(stateDevStorage);
  const scheduleRef = useRef<ScheduleItem[]>(scheduleDevStorage);

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
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          durations={durations}
          isRepeatOn={isRepeatOn}
          setState={setState}
          scheduleRef={scheduleRef}
          currentTimeEnd={currentTimeEnd}
          setCurrentTimeEnd={setCurrentTimeEnd}
        />
        {!state.isSettingsOpen && <ModeNav currentMode={currentMode} />}
      </div>
      <Footer
        state={state}
        setState={setState}
        setProgress={setProgress}
        setCurrentTimeEnd={setCurrentTimeEnd}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        durations={durations}
        isRepeatOn={isRepeatOn}
        scheduleRef={scheduleRef}
      />
    </div>
  );
}

export default App;
