import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { arrayOf, oneOfType, func, node, bool } from 'prop-types';

import BackButton from './back-button/BackButton';
import Close from '../../assets/icons/close.svg';

import useKeyboardEvent from '../../hooks/useKeyboardEvent';

import './Modal.scss';

/**
 * Modal component displays html elements passed through props in a popup window.
 *
 * @param {HTMLElement} children
 * @param {func} handleClose
 * @param {boolean} isMobile
 * @returns
 */
export default function Modal({ children, handleClose, isMobile }) {
  const modalRef = useRef(null);

  const keyEvent = {
    Escape: handleClose,
  };
  useKeyboardEvent(keyEvent);

  const modalBody = <div className="modal__body">{children}</div>;

  const mobileContent = (
    <div className="modal" ref={modalRef}>
      <BackButton handleClose={handleClose} />
      {modalBody}
    </div>
  );

  const desktopContent = (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <button type="button" className="modal__close" onClick={handleClose}>
          <Close data-cy="modal-close" alt="close" />
        </button>
        {modalBody}
      </div>
    </div>
  );

  const content = isMobile ? mobileContent : desktopContent;

  return createPortal(content, document.querySelector('.trips-travellers'));
}

Modal.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  handleClose: func.isRequired,
  isMobile: bool.isRequired,
};
