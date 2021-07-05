import React from 'react';
import { func, string } from 'prop-types';

import Chevron from '../../../assets/icons/chevron.svg';
import './BackButton.scss';

/**
 * BackButton component is used close a modal in the mobile view.
 *
 * @param {func} handleClose
 * @param {string} text
 * @returns
 */
function BackButton({ handleClose, text }) {
  return (
    <button data-cy="tnt-back-button" type="button" onClick={handleClose} className="back-button">
      <Chevron className="back-button__chevron" alt="Back button" />
      {text}
    </button>
  );
}

BackButton.propTypes = {
  handleClose: func.isRequired,
  text: string,
};

BackButton.defaultProps = {
  text: '',
};

export default BackButton;
