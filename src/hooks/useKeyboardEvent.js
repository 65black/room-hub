import { useEffect } from 'react';

/**
 * This hook executes an event when a key is pressed,
 * as per key and event value pair send through props.
 *
 * @param {object} keyboardEvents
 */
export default function useKeyboardEvent(keyboardEvents) {
  useEffect(() => {
    const processEvent = ({ key }) => {
      const action = keyboardEvents[key];
      if (action) {
        action();
      }
    };

    document.addEventListener('keyup', processEvent);

    return () => {
      document.removeEventListener('keyup', processEvent);
    };
  }, [keyboardEvents]);
}
