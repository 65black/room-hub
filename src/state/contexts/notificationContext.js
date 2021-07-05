import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import dispatchLogger from '../../utilities/dispatchLogger';
import { addNotificationAction, removeNotificationAction } from '../actions/notificationActions';
import notificationReducer from '../reducers/notificationReducer';

const NotificationContext = createContext();

/**
 * This context holds the notification state and functions.
 *
 * It allows any component to update the notification state
 * by providing the addNotification and removeNotification functions
 * to whatever component consumes it.
 */
export const NotificationContextProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const dispatchWithLogging = useMemo(() => dispatchLogger(dispatch), []);

  const addNotification = (data) => addNotificationAction(dispatchWithLogging, data);
  const removeNotification = (id) => removeNotificationAction(dispatchWithLogging, id);

  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};

/**
 * Allows any component to consume the notification context
 * by calling useNotificationContext()
 *
 * @returns {object}
 */
export const useNotificationContext = () => {
  const notificationContext = useContext(NotificationContext);
  return notificationContext;
};

NotificationContextProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};
