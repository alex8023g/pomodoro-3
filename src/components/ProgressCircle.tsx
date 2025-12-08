import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import type { State } from '../App';

type Props = {
  timeStart: number | null;
  timeEnd: number | null;
  state: State;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
};

export function ProgressCircle({
  timeStart,
  timeEnd,
  state,
  progress,
  setProgress,
}: Props) {
  console.log('🚀 ~ Circle ~ timeEnd:', timeEnd);
  console.log('🚀 ~ Circle ~ timeStart:', timeStart);

  // const progress = 301;
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (state.isTimerOn) {
      interval.current = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 1000);
      return () => clearInterval(interval.current as number);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  }, [state.isTimerOn, setProgress]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // const progress = ((duration - timeLeft) / duration) * circumference;
  // const progress = 749;
  const strokeDasharray = circumference - progress;
  return (
    <div className='1 absolute top-[27px] left-1/2 size-[266px] -translate-x-1/2'>
      <svg className='2 /h-60 /w-60 -rotate-90 transform' viewBox='0 0 260 260'>
        {/* <circle
            cx="125"
            cy="125"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          /> */}
        {/* Progress circle */}
        <circle
          cx={130}
          cy={130}
          r={radius}
          // stroke='#3b82f6'
          stroke='#fff'
          strokeWidth='10'
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDasharray}
          strokeLinecap='round'
          className='transition-all duration-1000 ease-linear'
        />
      </svg>
      {/* <p>{progress}</p> */}
    </div>
  );
}
