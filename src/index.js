import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ModalContextProvider } from './state/contexts/modalContext';
import { NotificationContextProvider } from './state/contexts/notificationContext';

ReactDOM.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
      </NotificationContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
