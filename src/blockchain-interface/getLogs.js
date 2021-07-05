const logs = {
  'mauna-kea': [
  {
    temperature: 15,
    pressure: 155,
    humidity: 25,
    timestamp: 1625275500000
  },
  {
    temperature: -3,
    pressure: 73,
    humidity: 23,
    timestamp: 1625275440000
  },
  {
    temperature: 37,
    pressure: 127,
    humidity: 27,
    timestamp: 1625275380000
  },
  {
    temperature: -15,
    pressure: 94,
    humidity: 24,
    timestamp: 1625275320000
  },
  {
    temperature: 12,
    pressure: 217,
    humidity: 17,
    timestamp: 1625275260000
  },
]
}

function getRoomLogs(roomId = 'mauna-kea') {
  // TODO: Read logs from contract
  return logs[roomId]
}

export default getRoomLogs
