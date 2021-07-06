import { ReactComponent as ChevronIcon } from '../../../assets/icons/chevron.svg';
import './BackButton.scss';

function BackButton({ handleClose, text }) {
  return (
    <button data-cy="tnt-back-button" type="button" onClick={handleClose} className="back-button">
      <ChevronIcon className="back-button__chevron" alt="Back button" />
      {text}
    </button>
  );
}

export default BackButton;
