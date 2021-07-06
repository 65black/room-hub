import React from 'react';

import AddDevice from '../../forms/add-device/AddDevice';
import Device from './device/Device';
import Card from '../card/Card';

import { useModalContext } from '../../state/contexts/modalContext';

import './Devices.scss';
import Button from '../button/Button';

function Devices({ devices }) {
  const { showModal } = useModalContext();

  const handleAddDevice = () => {
    showModal(<AddDevice />);
  };

  if (!devices.length) {
    return <Button text="Add a device" handleClick={handleAddDevice} isPrimary />;
  }

  const renderDevices = devices.map((device) => <Device key={device.imei} {...device} />);

  return (
    <Card extraClassNames="devices">
      <div className="devices__header">
        <p className="devices__heading">Your Devices</p>
        <Button
          text="Add new device"
          extraClassNames="devices__add-address"
          handleClick={handleAddDevice}
          isPrimary
        />
      </div>

      <div className="devices__items">{renderDevices}</div>
    </Card>
  );
}

export default Devices;
