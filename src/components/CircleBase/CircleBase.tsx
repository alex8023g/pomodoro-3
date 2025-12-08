import styles from './styles.module.css';
import { ProgressCircle } from '../ProgressCircle';
import type { State } from '../../App';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  state: State;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
};

export function CircleBase({ state, progress, setProgress }: Props) {
  return (
    <div className={styles.circleBase}>
      <ProgressCircle
        timeStart={null}
        timeEnd={null}
        state={state}
        progress={progress}
        setProgress={setProgress}
      />
    </div>
  );
}
