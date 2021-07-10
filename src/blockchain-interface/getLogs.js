const logs = {
  'mauna-kea': [
    {
      temperature: 15,
      pressure: 155,
      humidity: 25,
      timestamp: 1625275500000,
    },
    {
      temperature: -3,
      pressure: 73,
      humidity: 23,
      timestamp: 1625275440000,
    },
    {
      temperature: 37,
      pressure: 127,
      humidity: 27,
      timestamp: 1625275380000,
    },
    {
      temperature: -15,
      pressure: 94,
      humidity: 24,
      timestamp: 1625275320000,
    },
    {
      temperature: 12,
      pressure: 217,
      humidity: 17,
      timestamp: 1625275260000,
    },
  ],
};

// function getRoomLogs(roomId) {
//   // TODO: Read logs from contract
//   return logs[roomId] || [];
// }

async function getRoomLogs(roomId, contract) {
  let roomLogs = [];

  // console.log(roomId);
  try {
    // console.log(contract);
    const roomLogsCount = (await contract.getRoomLogsCount(roomId)).toNumber();
    // console.log(roomLogsCount);
    if (roomLogsCount > 0) {
      let logIds = [];
      for (let i = 0; i < roomLogsCount; i += 1) {
        logIds.push(contract.getRoomLogIdAtIndex(roomId, i));
      }

      logIds = await Promise.all(logIds);

      for (let i = 0; i < logIds.length; i += 1) {
        const logId = logIds[i];
        roomLogs.push(contract.logs(logId));
      }
    }

    roomLogs = await Promise.all(roomLogs);
  } catch (error) {
    // console.log(error);
  }

  return roomLogs.length ? roomLogs : logs['mauna-kea'];
}

export default getRoomLogs;
