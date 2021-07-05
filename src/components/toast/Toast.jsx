import React from 'react';
import { arrayOf, shape, string, func, number, oneOfType } from 'prop-types';

import NotificationsTick from '../../assets/icons/notifications_tick.svg';
import './Toast.scss';

/**
 * Toast component is used to show small notification popup, upon user activity.
 * @returns HTML
 */
function Toast({ notifications, closeToaster, closeToasterText }) {
  const displayNotifications =
    notifications &&
    notifications.map(({ id, message }) => (
      <div className="toast__box" key={id}>
        <span className="toast__message">
          <NotificationsTick className="toast__icon" />
          <span data-cy="toast-text" className="toast__text">
            {message}
          </span>
        </span>

        <div className="toast__close">
          <span className="toast__splitter" />
          <button
            data-cy="close-toast-button"
            type="button"
            className="toast__close-text"
            onClick={() => closeToaster(id)}
          >
            {closeToasterText}
          </button>
        </div>
      </div>
    ));

  return <div className="toast">{displayNotifications}</div>;
}

const notificationPropTypes = {
  id: oneOfType([number, string]).isRequired,
  message: string.isRequired,
};

Toast.propTypes = {
  notifications: arrayOf(shape(notificationPropTypes)),
  closeToaster: func,
  closeToasterText: string,
};

Toast.defaultProps = {
  notifications: [],
  closeToaster: () => {},
  closeToasterText: '',
};

export default Toast;
