import { createContext, useReducer, useContext, useMemo, useEffect } from 'react';

import modalReducer from '../reducers/modalReducer';
import { showModalAction, hideModalAction } from '../actions/modalActions';

import dispatchLogger from '../../utilities/dispatchLogger';
import preventBodyScroll from '../../utilities/preventBodyScroll';

const initialModalState = {
  isVisible: false,
  modalContent: null,
};

export const ModalContext = createContext({ initialModalState, dispatch: () => {} });

/**
 * This context holds the modal state and functions.
 *
 * It allows any component to update the modal state
 * by providing the showModal and hideModal functions
 * to whatever component consumes it.
 */
export function ModalContextProvider({ children }) {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

  const dispatchWithLogging = useMemo(() => dispatchLogger(dispatch), []);

  const showModal = (data) => showModalAction(dispatchWithLogging, data);
  const hideModal = () => hideModalAction(dispatchWithLogging);

  /**
   * When the dialog is opened on mobile view, scrolling the page should be disabled.
   */
  useEffect(() => {
    if (modalState.isVisible) {
      preventBodyScroll(true);
    }

    return () => preventBodyScroll(false);
  }, [modalState.isVisible]);

  const value = {
    modalState,
    showModal,
    hideModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

/**
 * Allows any component to consume the modal context
 * by calling useModalContext()
 *
 * @returns {object}
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
};
