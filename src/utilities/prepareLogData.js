function prepareLogData(logs) {
  const formattedLogs = {};
  const sortedAndTimedLogs = logs
    .sort((logA, logB) => logA.timestamp - logB.timestamp)
    .map((log) => ({
      ...log,
      time: `${new Date(log.timestamp).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      })} pm`,
    }));

  sortedAndTimedLogs.forEach(({ temperature, pressure, humidity, time }) => {
    Object.entries({
      temperature,
      pressure,
      humidity,
    }).forEach((entry) => {
      const [id, value] = entry;
      const formattedLog = {
        [id]: value,
        unit: id === 'temperature' ? '°C' : id === 'pressure' ? 'mmHg' : '%',
        time,
      };

      if (formattedLogs[id]) {
        formattedLogs[id].push(formattedLog);
      } else {
        formattedLogs[id] = [formattedLog];
      }
    });
  });

  return formattedLogs;
}

export default prepareLogData;
