import { useEffect, useReducer } from 'react';

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

const fetchDevices = async (roomId, contract) => {
  let roomDevices = [];

  const roomDevicesCount = (await contract.getRoomDevicesCount(roomId)).toNumber();
  if (roomDevicesCount > 0) {
    let devicesAddresses = [];
    for (let i = 0; i < roomDevicesCount; i += 1) {
      devicesAddresses.push(contract.getRoomDeviceIdAtIndex(roomId, i));
    }

    devicesAddresses = await Promise.all(devicesAddresses);

    for (let i = 0; i < devicesAddresses.length; i += 1) {
      const deviceAddress = devicesAddresses[i];
      roomDevices.push(contract.devices(deviceAddress));
    }

    roomDevices = (await Promise.all(roomDevices)).map((device) => ({
      id: device.id,
      name: device.name,
      imei: device.imei,
    }));
  }

  return roomDevices;
};

function useRoom({ roomId, contract }) {
  const [roomState, dispatch] = useReducer(roomsReducer, initialRoomsState);

  useEffect(async () => {
    try {
      dispatch({
        type: UPDATE_ACTION,
        field: 'isLoading',
        data: true,
      });

      const roomInfoResponse = await contract.rooms(roomId);
      const roomThresholdResponse = await contract.roomThresholds(roomId);
      const roomDevices = await fetchDevices(roomId, contract);

      console.log(roomThresholdResponse);

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
      console.log(roomInfo);

      window.r = roomInfo;
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
  }, []);

  return roomState;
}

export default useRoom;
