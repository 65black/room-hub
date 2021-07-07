import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ProvideAuth } from './components/route-guards/RouteGuards';

import { ModalContextProvider } from './state/contexts/modalContext';
import { NotificationContextProvider } from './state/contexts/notificationContext';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <NotificationContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </NotificationContextProvider>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root'),
);
