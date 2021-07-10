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

  return roomLogs;
}

export default getRoomLogs;
