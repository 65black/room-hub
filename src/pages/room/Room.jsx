import { useParams } from 'react-router-dom';

import getDevices from '../../blockchain-interface/getDevices';
import getRoomLogs from '../../blockchain-interface/getLogs';
import getRoom from '../../blockchain-interface/getRoom';
import prepareLogData from '../../utilities/prepareLogData';

import ConfiguredThreshold from '../../components/configured-threshold/ConfiguredThreshold';
import EmptyRoom from '../../components/empty-room/EmptyRoom';
import Devices from '../../components/devices/Devices';
import LogChart from '../../components/log-chart/LogChart';
import RoomInfo from '../../components/room-info/RoomInfo';

import './Room.scss';

function Room() {
  const { slug } = useParams();

  const room = getRoom(slug);
  const devices = getDevices(slug);
  const logs = getRoomLogs(slug);

  if (!logs.length) {
    return <EmptyRoom devices={devices} />;
  }

  const logsData = prepareLogData(logs);

  const renderedCharts = Object.entries(logsData).map(([logId, logData]) => {
    const logStyling = {
      color: logId === 'temperature' ? '#3d405b' : logId === 'pressure' ? '#e07a5f' : '#81b29a',
      yAxisUnit: logId === 'temperature' ? '°C' : logId === 'pressure' ? 'mmHg' : '%',
    };

    console.log({ logId, logData });
    return (
      <LogChart
        name={logId}
        key={logId}
        log={logData}
        thresholds={room.threshold}
        {...logStyling}
      />
    );
  });

  return (
    <div className="room">
      <RoomInfo room={room} latestLog={logs[0]} />
      <ConfiguredThreshold threshold={room.threshold} />
      {renderedCharts}
      <Devices devices={devices} />
    </div>
  );
}

export default Room;
