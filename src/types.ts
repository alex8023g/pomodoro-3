export type Mode = 'pomodoro' | 'short_break' | 'long_break';

export type ScheduleItem = {
  mode: Mode;
  timeEnd: number;
};

export type State = {
  isSettingsOpen: boolean;
  isTimerOn: boolean;
  isReset: boolean;
};

export type TimeStartEnd = {
  timeStart: number | null;
  timeEnd: number | null;
};

export type Durations = {
  pom: number;
  short: number;
  long: number;
};
