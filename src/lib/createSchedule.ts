import type { Durations, Mode, ScheduleItem } from '../types/types';

export function createSchedule({
  isRepeatOn,
  durations,
  currentMode,
}: {
  isRepeatOn: boolean;
  durations: Durations;
  currentMode: Mode;
}) {
  const schedule: ScheduleItem[] = [];
  const timeStamp = Date.now();
  let prevCycleLength = 0;

  if (currentMode === 'pomodoro') {
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
  } else if (currentMode === 'short_break') {
    schedule.push(
      {
        mode: 'short_break',
        timeEnd: timeStamp + prevCycleLength + durations.short * 60 * 1000,
        duration: durations.short * 60 * 1000,
      },
      {
        mode: 'pomodoro',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.short + durations.pom) * 60 * 1000,
        duration: durations.pom * 60 * 1000,
      },
      {
        mode: 'long_break',
        timeEnd:
          timeStamp +
          prevCycleLength +
          (durations.short + durations.pom + durations.long) * 60 * 1000,
        duration: durations.long * 60 * 1000,
      },
    );
    prevCycleLength +=
      (durations.short + durations.pom + durations.long) * 60 * 1000;
  } else if (currentMode === 'long_break') {
    schedule.push({
      mode: 'long_break',
      timeEnd: timeStamp + prevCycleLength + durations.long * 60 * 1000,
      duration: durations.long * 60 * 1000,
    });
    prevCycleLength += durations.long * 60 * 1000;
  }

  if (isRepeatOn) {
    for (let i = 1; i < 10; i++) {
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
  }

  return schedule;
}
