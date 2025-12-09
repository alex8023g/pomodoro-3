export type Mode = 'pomodoro' | 'short_break' | 'long_break';

export type ScheduleItem = {
  mode: Mode;
  timeEnd: number;
  duration: number;
};

export type State = {
  isSettingsOpen: boolean;
  isTimerOn: boolean;
  isReset: boolean;
};

export type Durations = {
  pom: number;
  short: number;
  long: number;
};
