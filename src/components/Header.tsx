import type { Dispatch, SetStateAction } from 'react';
import { deviceStorage } from '../storages/deviceStorage';
import { Layout } from './Layout';

export function Header({
  isRepeatOn,
  setIsRepeatOn,
}: {
  isRepeatOn: boolean;
  setIsRepeatOn: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <header className='font-[aclonica] text-2xl font-bold text-[#020F55]'>
      <Layout>
        <div className='flex items-center justify-between px-4 pt-10'>
          <h1>POMODORO</h1>
          <button
            onClick={() => {
              setIsRepeatOn(!isRepeatOn);
              deviceStorage.setIsRepeatOn(!isRepeatOn);
            }}
          >
            <div className='/border flex h-10 w-10 items-center justify-center'>
              {isRepeatOn ? (
                <img src='/repeat_on.png' alt='pause button' />
              ) : (
                <img
                  src='/repeat_off.png'
                  alt='pause button'
                  className='h-6 w-6'
                />
              )}
            </div>
          </button>
        </div>
      </Layout>
    </header>
  );
}
