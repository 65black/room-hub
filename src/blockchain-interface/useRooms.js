import { useEffect, useReducer } from 'react';
import getRooms from './getRooms';

const UPDATE_ACTION = 'UPDATE';
const initialRoomsState = {
  rooms: [],
  isLoading: false,
  error: null,
};

function roomsReducer(state = initialRoomsState, action) {
  switch (action.type) {
    case UPDATE_ACTION:
      return {
        ...state,
        [action.field]: action.data,
      };

    default:
      throw new Error('action not recognised');
  }
}

function useRooms({ contract }) {
  const [roomsState, dispatch] = useReducer(roomsReducer, initialRoomsState);

  const fetchRooms = async () => {
    try {
      dispatch({
        type: UPDATE_ACTION,
        field: 'isLoading',
        data: true,
      });

      const rooms = await getRooms(contract);

      dispatch({
        type: UPDATE_ACTION,
        field: 'rooms',
        data: rooms,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ACTION,
        field: 'error',
        data: error,
      });
    } finally {
      dispatch({
        type: UPDATE_ACTION,
        field: 'isLoading',
        data: false,
      });
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return [roomsState, fetchRooms];
}

export default useRooms;
