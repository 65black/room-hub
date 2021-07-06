const rooms = {
  'mauna-kea': {
    name: 'Mauna Kea',
    threshold: {
      upper: {
        temperature: 32,
        pressure: 175,
        humidity: 75,
      },
      lower: {
        temperature: -10,
        pressure: 105,
        humidity: 15,
      },
    },
  },
};

function getRoom(roomId) {
  // TODO: Read room details from contract
  return rooms[roomId] || {};
}

export default getRoom;
