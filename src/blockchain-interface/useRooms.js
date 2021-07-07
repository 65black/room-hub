import { useEffect, useReducer } from 'react';

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

  useEffect(async () => {
    try {
      dispatch({
        type: UPDATE_ACTION,
        field: 'isLoading',
        data: true,
      });

      const userRoomsCount = (await contract.getRoomsCount()).toNumber();
      if (userRoomsCount > 0) {
        let roomIds = [];
        for (let i = 0; i < userRoomsCount; i += 1) {
          roomIds.push(contract.getRoomIdAtIndex(i));
        }

        roomIds = await Promise.all(roomIds);

        let userRooms = [];
        for (let i = 0; i < roomIds.length; i += 1) {
          const roomId = roomIds[i];
          userRooms.push(contract.rooms(roomId));
        }

        userRooms = (await Promise.all(userRooms)).map((room) => ({
          id: room.id,
          name: room.name,
          timestampAdded: room.timestampAdded,
        }));

        window.r = userRooms;
        dispatch({
          type: UPDATE_ACTION,
          field: 'rooms',
          data: userRooms,
        });
      }
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
  }, []);

  return roomsState;
}

export default useRooms;
