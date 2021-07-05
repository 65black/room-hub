import React, { Fragment } from 'react';

import { useNotificationContext } from '../../state/contexts/notificationContext';
import { useModalContext } from '../../state/contexts/modalContext';
import useIsDesktop from '../../hooks/useIsDesktop';

import Toast from '../toast/Toast';
import Modal from '../modal/Modal';

/**
 * Toast component is used to show small notification popup, upon user activity.
 * @returns HTML
 */
function Actions() {
  const isDesktop = useIsDesktop();
  const { notifications, removeNotification } = useNotificationContext();
  const { modalState, hideModal } = useModalContext();

  const closeToasterText = 'Ok'

  function closeToaster(id) {
    removeNotification(id);
  }

  const displayToast = (
    <Toast
      notifications={notifications}
      closeToaster={closeToaster}
      closeToasterText={closeToasterText}
    />
  );

  const { isVisible, modalContent } = modalState;

  const closeModal = () => {
    hideModal();
  };

  const displayModal = isVisible ? (
    <Modal handleClose={() => closeModal(false)} isMobile={!isDesktop}>
      {modalContent}
    </Modal>
  ) : null;

  return (
    <Fragment>
      {displayToast}
      {displayModal}
    </Fragment>
  );
}

export default Actions;
