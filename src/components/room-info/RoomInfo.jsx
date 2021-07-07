import { Link } from 'react-router-dom';

import Log from '../log/Log';
import EmptyRoom from '../empty-room/EmptyRoom';

import { ReactComponent as CheckmarkIcon } from '../../assets/icons/checkmark_icon.svg';
import './RoomInfo.scss';

function RoomInfo({ room, latestLog }) {
  let summary = <EmptyRoom devices={room.devices} />;

  if (latestLog) {
    const readableTimestamp = new Date(latestLog.timestamp).toDateString();

    const logDetailsToRender = {
      temperature: latestLog.temperature,
      pressure: latestLog.pressure,
      humidity: latestLog.humidity,
    };

    summary = (
      <>
        <span className="room-info__summary">
          Room conditions are ok
          <CheckmarkIcon className="room-info__summary-icon" />
        </span>

        <h4 className="room-info__status-summary">Latest status on {readableTimestamp}</h4>

        <div className="room-info__status-container">
          <Log logs={logDetailsToRender} />
        </div>

        <Link className="room-info__all-logs" to={encodeURI(`/${room.id}/logs`)}>
          All Logs
        </Link>
      </>
    );
  }

  return (
    <section className="room-info">
      <h3 className="room-info__room-name">Room {room.name}</h3>
      {summary}
    </section>
  );
}

export default RoomInfo;
