const devices = {
  'mauna-kea': [
    {
      name: 'North',
      imei: 8828284920482,
      address: '',
    },
    {
      name: 'East',
      imei: 8828284920890,
      address: '',
    },
    {
      name: 'South',
      imei: 8828284920100,
      address: '',
    },
    {
      name: 'West',
      imei: 8828284920433,
      address: '',
    },
  ],
};

function getDevices(roomId = 'mauna-kea') {
  // TODO: Read devices from contract
  return devices[roomId] || [];
}

export default getDevices;
