import { Preferences } from '@capacitor/preferences';
import type { Durations, State } from '../types/types';
import { defaultDurations, defaultState } from '../constants';
import type { ScheduleItem } from '../types/types';

export const deviceStorage = {
  setIsRepeatOn: async (isRepeatOn: boolean) => {
    console.log('🚀 ~ setIsRepeatOn:', isRepeatOn);
    await Preferences.set({
      key: 'isRepeatOn',
      value: JSON.stringify(isRepeatOn),
    });
  },

  getIsRepeatOn: async (): Promise<boolean> => {
    console.log('🚀 ~ getIsRepeatOn:');
    const ret = await Preferences.get({ key: 'isRepeatOn' });
    if (!ret.value) {
      await Preferences.set({
        key: 'isRepeatOn',
        value: JSON.stringify(false),
      });
      return false;
    }
    return JSON.parse(ret.value);
  },

  setDurations: async (durations: Durations) => {
    await Preferences.set({
      key: 'durations',
      value: JSON.stringify(durations),
    });
  },

  getDurations: async (): Promise<Durations> => {
    const ret = await Preferences.get({ key: 'durations' });
    if (!ret.value) {
      await Preferences.set({
        key: 'durations',
        value: JSON.stringify(defaultDurations),
      });
      return defaultDurations;
    }
    return JSON.parse(ret.value);
  },

  updateDurations: async ({
    duration,
    durationsKey,
  }: {
    duration: number;
    durationsKey: keyof Durations;
  }) => {
    const durations = await deviceStorage.getDurations();
    durations[durationsKey] = duration;
    await deviceStorage.setDurations(durations);
  },

  setSchedule: async (schedule: ScheduleItem[]) => {
    await Preferences.set({
      key: 'schedule',
      value: JSON.stringify(schedule),
    });
  },

  getSchedule: async (): Promise<ScheduleItem[]> => {
    const res = await Preferences.get({ key: 'schedule' });
    if (!res.value) {
      await Preferences.set({
        key: 'schedule',
        value: JSON.stringify([]),
      });
      return [];
    }
    const schedule = JSON.parse(res.value);
    const actualSchedule = schedule.filter(
      (item: ScheduleItem) => item.timeEnd > Date.now(),
    );
    if (actualSchedule.length > schedule.length) {
      Preferences.set({
        key: 'schedule',
        value: JSON.stringify(actualSchedule),
      });
    }
    return actualSchedule;
  },

  setState: async (state: State) => {
    await Preferences.set({
      key: 'state',
      value: JSON.stringify(state),
    });
  },

  getState: async (): Promise<State> => {
    const res = await Preferences.get({ key: 'state' });
    if (!res.value) {
      await Preferences.set({
        key: 'state',
        value: JSON.stringify(defaultState),
      });
      return defaultState;
    }
    return JSON.parse(res.value);
  },
};
