import NotificationsTick from '../../assets/icons/notifications_tick.svg';
import './Toast.scss';

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

export default Toast;
