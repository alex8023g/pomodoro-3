import type { State } from '../../types/types';
import { SelectDuration } from '../SelectDuration';
import styles from './styles.module.css';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  durations: {
    pom: number;
    short: number;
    long: number;
  };
  setDurations: Dispatch<
    SetStateAction<{ pom: number; short: number; long: number }>
  >;
};

export function Settings({ state, setState, durations, setDurations }: Props) {
  return (
    <div className='mx-auto mb-[43.5px] font-[aclonica]'>
      <div className={styles.settingsFrame}>
        <div className='flex justify-between border-b border-white/20 px-10 pb-5'>
          <h1 className={styles.settingsTitle}>Settings</h1>
          <button onClick={() => setState({ ...state, isSettingsOpen: false })}>
            <img src='/close.png' alt='' />
          </button>
        </div>
        <div className='border-b border-white/20 px-10 pt-5'>
          <h2 className={styles.timeTitle}>Time (minutes)</h2>
          <div className='mb-10 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className={styles.settingName}>pomodoro</div>
              <div className='w-1/2 text-center'>
                <SelectDuration
                  values={[25, 30, 35, 40, 1, 3, 0.5]}
                  duration={durations.pom}
                  setDuration={setDurations}
                  durationsKey='pom'
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className={styles.settingName}>break short</div>
              <div className='w-1/2 text-center'>
                <SelectDuration
                  values={[5, 10, 15, 1, 0.5]}
                  duration={durations.short}
                  setDuration={setDurations}
                  durationsKey='short'
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className={styles.settingName}>break long</div>
              <div className='w-1/2 text-center'>
                <SelectDuration
                  values={[15, 20, 25, 30, 1, 2, 0.5]}
                  duration={durations.long}
                  setDuration={setDurations}
                  durationsKey='long'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
