async function addLog({ log, contract }) {
  const {
    message: { temperature, humidity, pressure, timestamp },
    signature: { r, s },
  } = log;
  const logId = Math.random().toString();
  const transaction = await contract.addLog(
    logId,
    temperature,
    humidity,
    pressure,
    timestamp,
    `0x${r}`,
    `0x${s}`,
  );
  const transactionData = await transaction.wait();

  return transactionData;
}

export default addLog;
