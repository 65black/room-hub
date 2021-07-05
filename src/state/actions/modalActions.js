import { SHOW_MODAL, HIDE_MODAL } from './types';

export function showModalAction(dispatch, data) {
  dispatch({
    type: SHOW_MODAL,
    data,
  });
}

export function hideModalAction(dispatch) {
  dispatch({
    type: HIDE_MODAL,
  });
}
