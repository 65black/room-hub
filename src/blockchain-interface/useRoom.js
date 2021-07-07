import { useEffect, useReducer } from 'react';

import getDevices from './getDevices';

const UPDATE_ACTION = 'UPDATE';
const initialRoomsState = {
  room: null,
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

function useRoom({ roomId, contract }) {
  const [roomState, dispatch] = useReducer(roomsReducer, initialRoomsState);

  const fetchRoomData = async () => {
    try {
      dispatch({
        type: UPDATE_ACTION,
        field: 'isLoading',
        data: true,
      });

      const roomInfoResponse = await contract.rooms(roomId);
      const roomThresholdResponse = await contract.roomThresholds(roomId);
      const roomDevices = await getDevices(roomId, contract);

      const hasValidThreshold = roomThresholdResponse.every((val) => val.length);

      const roomInfo = {
        id: roomInfoResponse.id,
        name: roomInfoResponse.name,
        timestampAdded: roomInfoResponse.timestampAdded,
        threshold: hasValidThreshold
          ? {
              upper: {
                temperature: roomThresholdResponse.temperatureUpper,
                humidity: roomThresholdResponse.humidityUpper,
                pressure: roomThresholdResponse.pressureUpper,
              },
              lower: {
                temperature: roomThresholdResponse.temperatureLower,
                humidity: roomThresholdResponse.humidityLower,
                pressure: roomThresholdResponse.pressureLower,
              },
            }
          : null,
        devices: roomDevices, // TODO fetch devices
        logs: [], // TODO fetch logs
      };

      dispatch({
        type: UPDATE_ACTION,
        field: 'room',
        data: roomInfo,
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

  useEffect(async () => {
    fetchRoomData();
  }, []);

  return [roomState, fetchRoomData];
}

export default useRoom;
