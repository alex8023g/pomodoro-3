import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { requestNotificationPermissions } from './lib/localNotifications';

requestNotificationPermissions();
LocalNotifications.getPending().then((notifications) => {
  console.log('Pending notifications!!: ', notifications);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
