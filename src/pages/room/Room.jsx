import { Switch, Route, useParams } from 'react-router-dom';

import getDevices from '../../blockchain-interface/getDevices';
import getRoomLogs from '../../blockchain-interface/getLogs';
import getRoom from '../../blockchain-interface/getRoom';
import prepareLogData from '../../utilities/prepareLogData';

import useIsDesktop from '../../hooks/useIsDesktop';

import ConfiguredThreshold from '../../components/configured-threshold/ConfiguredThreshold';
import EmptyRoom from '../../components/empty-room/EmptyRoom';
import Devices from '../../components/devices/Devices';
import LogChart from '../../components/log-chart/LogChart';
import RoomInfo from '../../components/room-info/RoomInfo';
import Logs from '../logs/Logs';

import './Room.scss';

function Room() {
  const { roomId } = useParams();
  const { isDesktop } = useIsDesktop();

  const room = getRoom(roomId);
  const devices = getDevices(roomId);
  const logs = getRoomLogs(roomId);

  if (!logs.length) {
    return <EmptyRoom devices={devices} />;
  }

  const logsData = prepareLogData(logs);

  const renderedCharts = Object.entries(logsData).map(([logId, logData]) => {
    const logStyling = {
      color: logId === 'temperature' ? '#fefae0' : logId === 'pressure' ? '#e07a5f' : '#81b29a',
      yAxisUnit: logId === 'temperature' ? '°C' : logId === 'pressure' ? 'mmHg' : '%',
    };

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
    <>
      <Switch>
        <Route path="/:roomId" exact>
          <div className="room">
            <RoomInfo room={room} latestLog={logs[0]} />
            <ConfiguredThreshold threshold={room.threshold} />
            {!isDesktop && <Devices devices={devices} />}
            {renderedCharts}
            {isDesktop && <Devices devices={devices} />}
          </div>
        </Route>

        <Route path="/:roomId/logs">
          <Logs />
        </Route>
      </Switch>
    </>
  );
}

export default Room;
