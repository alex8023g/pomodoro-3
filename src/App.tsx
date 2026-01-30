import './App.css';
import { CircleBase } from './components/CircleBase/CircleBase';
import { Footer } from './components/Footer';
import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Settings } from './components/Settings/Settings';
import { ModeNav } from './components/ModeNav';
import { deviceStorage } from './storages/deviceStorage';
import type { Durations, Mode, ScheduleItem } from './types/types';
import { defaultDurations } from './constants';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Layout } from './components/Layout';
import { toast, Toaster } from 'sonner';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>('pomodoro');
  const [currentTimeEnd, setCurrentTimeEnd] = useState<number | null>(null);
  const [isRepeatOn, setIsRepeatOn] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<Durations>(defaultDurations);
  const [state, setState] = useState({
    isSettingsOpen: false,
    isTimerOn: false,
    isReset: true,
  });
  const scheduleRef = useRef<ScheduleItem[]>([]);

  useEffect(() => {
    (async () => {
      // request permissions for local notifications
      const status = await LocalNotifications.requestPermissions();
      if (status.display === 'granted') {
        console.log('Notification permissions granted');
      } else {
        console.log('Notification permissions denied');
        toast(
          <div>
            Браузерные уведомления отключены.
            <div>
              <a
                href='https://emilkowal.ski/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Как включить?
              </a>
            </div>
          </div>,
          { duration: Infinity },
        );
      }
    })();
    // add listener for local notification received. When the notification is received, play the sound.
    LocalNotifications.addListener(
      'localNotificationReceived',
      (notification) => {
        console.log('🚀 ~ LNSetScheduleBtn ~ notification:', notification);
        toast.info(notification.body);
        const sound = notification.sound;
        if (sound) {
          const audio = new Audio('/new-notification.mp3');
          audio.play();
        }
      },
    );
    return () => {
      LocalNotifications.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    // Load the state from the storage
    (async () => {
      deviceStorage.getIsRepeatOn().then((res) => {
        setIsRepeatOn(res);
      });
      deviceStorage.getDurations().then((res) => {
        setDurations(res);
      });
      deviceStorage.getSchedule().then((res) => {
        setCurrentMode(res[0]?.mode || 'pomodoro');
        setCurrentTimeEnd(res[0]?.timeEnd || null);
        scheduleRef.current = res;
      });
      deviceStorage.getState().then((res) => {
        setState(res);
      });
    })();
  }, []);

  return (
    // <div className='flex h-dvh flex-col justify-between bg-[#50a6d9] bg-[url(/root_bg_2.png)] bg-cover bg-center'>
    <div className='flex h-dvh flex-col justify-between bg-radial-[at_50%_50%] from-[#0754B0] to-[#50A6D9] to-90%'>
      <Header isRepeatOn={isRepeatOn} setIsRepeatOn={setIsRepeatOn} />
      <main className='relative mx-auto flex h-full w-full flex-col items-center justify-center text-3xl font-bold'>
        <Layout>
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
        </Layout>
        {!state.isSettingsOpen && (
          <ModeNav
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}
            state={state}
          />
        )}
      </main>
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
      <Toaster richColors position='bottom-right' closeButton />
    </div>
  );
}

export default App;
