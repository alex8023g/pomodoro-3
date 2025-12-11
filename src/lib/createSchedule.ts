import type { Durations, ScheduleItem } from '../types/types';

export function createSchedule({
  isRepeatOn,
  durations,
}: {
  isRepeatOn: boolean;
  durations: Durations;
}) {
  const length = isRepeatOn ? 10 : 1;

  const schedule: ScheduleItem[] = [];
  const timeStamp = Date.now();
  let prevCycleLength = 0;
  for (let i = 0; i < length; i++) {
    schedule.push(
      {
        mode: 'pomodoro',
        timeEnd: timeStamp + prevCycleLength + durations.pom * 60 * 1000,
        duration: durations.pom * 60 * 1000,
      },
      {
        mode: 'short_break',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.pom + durations.short) * 60 * 1000,
        duration: durations.short * 60 * 1000,
      },
      {
        mode: 'pomodoro',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.pom + durations.short + durations.pom) * 60 * 1000,
        duration: durations.pom * 60 * 1000,
      },
      {
        mode: 'long_break',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.pom + durations.short + durations.pom + durations.long) *
            60 *
            1000,
        duration: durations.long * 60 * 1000,
      },
    );
    prevCycleLength +=
      (durations.pom + durations.short + durations.pom + durations.long) *
      60 *
      1000;
  }

  return schedule;
}
