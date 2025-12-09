import type { Durations, ScheduleItem } from '../types';

export function createSchedule({
  isRepeatOn,
  durations,
}: {
  isRepeatOn: boolean;
  durations: Durations;
}) {
  console.log('🚀 ~ createSchedule ~ isRepeatOn:', isRepeatOn);
  console.log('🚀 ~ createSchedule start');
  const length = isRepeatOn ? 10 : 1;
  console.log('🚀 ~ createSchedule ~ length:', length);
  const schedule: ScheduleItem[] = [];
  console.log('🚀 ~ createSchedule ~ schedule:', schedule);
  const timeStamp = Date.now();
  console.log('🚀 ~ createSchedule ~ timeStamp:', timeStamp);
  let prevCycleLength = 0;
  for (let i = 0; i < length; i++) {
    console.log('🚀 ~ i:', i);
    schedule.push(
      {
        mode: 'pomodoro',
        timeEnd: timeStamp + prevCycleLength + durations.pom * 60 * 1000,
      },
      {
        mode: 'short_break',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.pom + durations.short) * 60 * 1000,
      },
      {
        mode: 'pomodoro',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.pom + durations.short + durations.pom) * 60 * 1000,
      },
      {
        mode: 'long_break',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.pom + durations.short + durations.pom + durations.long) *
            60 *
            1000,
      },
    );
    prevCycleLength +=
      (durations.pom + durations.short + durations.long) * 60 * 1000;
  }

  return schedule;
}
