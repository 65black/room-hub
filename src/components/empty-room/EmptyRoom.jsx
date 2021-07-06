import React from 'react';

import Devices from '../devices/Devices';

import './EmptyRoom.scss';

function EmptyRoom({ devices }) {
  return (
    <section className="empty-room">
      <h2 className="empty-room__heading">No data collected for this room</h2>

      <p className="empty-room__description">
        Either add a device, or wait for the devices to start collecting data
      </p>

      <Devices devices={devices} />
    </section>
  );
}

export default EmptyRoom;
