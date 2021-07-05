import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';

export function addNotificationAction(dispatch, data) {
  dispatch({
    type: ADD_NOTIFICATION,
    data,
  });
}

export function removeNotificationAction(dispatch, id) {
  dispatch({
    type: REMOVE_NOTIFICATION,
    id,
  });
}
