import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

export const modalReducer = (_, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        modalContent: action.data,
        isVisible: true,
      };
    }

    case HIDE_MODAL: {
      return {
        modalContent: null,
        isVisible: false,
      };
    }

    default:
      throw new Error('Not a valid modal context operation');
  }
};
