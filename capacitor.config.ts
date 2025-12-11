import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.grachev.pomodoro3',
  appName: 'pomodoro-3',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav',
    },
  },
  // server: {
  //   url: 'http://192.168.5.164:5173',
  //   cleartext: true,
  // },
};

export default config;
