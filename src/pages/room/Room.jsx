import { Switch, Route, useParams } from 'react-router-dom';

import prepareLogData from '../../utilities/prepareLogData';

import useIsDesktop from '../../hooks/useIsDesktop';

import ConfiguredThreshold from '../../components/configured-threshold/ConfiguredThreshold';
import Devices from '../../components/devices/Devices';
import LogChart from '../../components/log-chart/LogChart';
import RoomInfo from '../../components/room-info/RoomInfo';
import Logs from '../logs/Logs';

import './Room.scss';
import useRoom from '../../blockchain-interface/useRoom';
import { useAuth } from '../../components/route-guards/RouteGuards';

function Room() {
  const { contract } = useAuth();
  const { roomId } = useParams();
  const { isLoading, room } = useRoom({ roomId, contract });
  const { isDesktop } = useIsDesktop();

  if (isLoading) return <p>loading...</p>;

  // const devices = getDevices(roomId);
  // const logs = getRoomLogs(roomId);

  if (!room) return <p>no data</p>;

  // if (!room.logs.length) {
  //   return <EmptyRoom devices={room.devices} />;
  // }

  const logsData = prepareLogData(room.logs);

  const renderedCharts = room.logs.length
    ? Object.entries(logsData).map(([logId, logData]) => {
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
      })
    : null;

  return (
    <>
      <Switch>
        <Route path="/:roomId" exact>
          <div className="room">
            <RoomInfo room={room} latestLog={room.logs[0]} />
            <ConfiguredThreshold threshold={room.threshold} />
            {!isDesktop ? <Devices devices={room.devices} /> : null}
            {renderedCharts}
            {isDesktop ? <Devices devices={room.devices} /> : null}
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
