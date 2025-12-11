import {
  LocalNotifications,
  type ScheduleOptions,
} from '@capacitor/local-notifications';
import type { ScheduleItem } from '../types/types';

// 1. Request notification permissions (iOS will prompt the user on the first call)
export async function requestNotificationPermissions() {
  const status = await LocalNotifications.requestPermissions();
  if (status.display === 'granted') {
    console.log('Notification permissions granted');
  } else {
    console.log('Notification permissions denied');
  }
}

// 2. Schedule a local notification to fire in 5 seconds
export async function scheduleBasicNotification({
  schedule,
}: {
  schedule: ScheduleItem[];
}) {
  console.log('🚀 ~ scheduleBasicNotification ~ schedule:', schedule);
  // const now = new Date();
  // const futureDate = new Date(now.getTime() + 20000);

  const notifications = schedule.map((item, i) => {
    const eventDate = new Date(item.timeEnd);

    return {
      title: `Pomodoro`,
      body: item.mode === 'pomodoro' ? 'time to rest' : 'time to work',
      id: i + 1, // Unique identifier for the notification
      schedule: {
        at: eventDate,
      },
      sound: 'beep.wav',
    };
  });

  console.log('🚀 ~ scheduleBasicNotification ~ notifications:', notifications);

  const options: ScheduleOptions = {
    notifications: notifications,
  };

  await LocalNotifications.schedule(options);
  console.log('Notification scheduled');
}

// 3. Add a listener for when a user interacts with a notification
LocalNotifications.addListener(
  'localNotificationActionPerformed',
  (notificationAction) => {
    console.log(
      `Notification action performed: ${notificationAction.actionId}`,
    );
    console.log('Notification details:', notificationAction.notification);
  },
);

// 4. Cancel all notifications
export async function cancelAllNotifications() {
  const pending = await LocalNotifications.getPending();
  console.log('🚀 ~ cancelAllNotifications ~ pending:', pending);
  if (pending.notifications.length > 0) {
    await LocalNotifications.cancel({
      notifications: pending.notifications.map((notification) => ({
        id: notification.id,
      })),
    });
  }
}
