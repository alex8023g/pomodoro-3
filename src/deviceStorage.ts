import { Preferences } from '@capacitor/preferences';
import type { Durations } from './types';
import { defaultDurations } from './constants';
import type { ScheduleItem } from './types';

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
    const ret = await Preferences.get({ key: 'schedule' });
    if (!ret.value) {
      await Preferences.set({
        key: 'schedule',
        value: JSON.stringify([]),
      });
      return [];
    }
    return JSON.parse(ret.value);
  },
};
