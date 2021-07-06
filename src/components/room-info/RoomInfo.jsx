import Log from '../log/Log';

import { ReactComponent as CheckmarkIcon } from '../../assets/icons/checkmark_icon.svg';
import './RoomInfo.scss';

function RoomInfo({ room, latestLog }) {
  const summary = (
    <span className="room-info__summary">
      Room conditions are ok
      <CheckmarkIcon className="room-info__summary-icon" />
    </span>
  );
  const readableTimestamp = new Date(latestLog.timestamp).toDateString();

  const logDetailsToRender = {
    temperature: latestLog.temperature,
    pressure: latestLog.pressure,
    humidity: latestLog.humidity,
  };

  return (
    <section className="room-info">
      <h3 className="room-info__room-name">Room {room.name}</h3>
      {summary}

      <h4 className="room-info__status-summary">Latest status on {readableTimestamp}</h4>

      <div className="room-info__status-container">
        <Log logs={logDetailsToRender} />
      </div>
    </section>
  );
}

export default RoomInfo;
