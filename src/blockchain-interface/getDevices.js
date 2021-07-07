async function getDevices(roomId, contract) {
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
      id: device.deviceAddress,
      name: device.name,
      imei: device.imei,
    }));
  }

  return roomDevices;
}

export default getDevices;
