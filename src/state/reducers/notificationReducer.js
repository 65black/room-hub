import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/types';

function notificationReducer(state, action) {
  switch (action.type) {
    case REMOVE_NOTIFICATION: {
      const newNotifications = [...state];
      const index = newNotifications.findIndex(({ id }) => id === action.id);

      if (index > -1) {
        newNotifications.splice(index, 1);
      }
      return newNotifications;
    }

    case ADD_NOTIFICATION: {
      const newNotifications = [...state];
      const newNotification = action.data;

      if (newNotification) {
        newNotifications.push(newNotification);
      }

      return newNotifications;
    }

    default:
      throw new Error('action not recognised');
  }
}

export default notificationReducer;
