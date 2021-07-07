import { useParams } from 'react-router-dom';

import AddDevice from '../../forms/add-device/AddDevice';
import Device from './device/Device';
import Card from '../card/Card';

import { useModalContext } from '../../state/contexts/modalContext';

import './Devices.scss';
import Button from '../button/Button';

function Devices({ devices, fetchRoomData }) {
  const { roomId } = useParams();
  const { showModal, hideModal } = useModalContext();

  const handleAddDevice = () => {
    const onSuccess = () => {
      hideModal();
      fetchRoomData();
    };

    showModal(<AddDevice roomId={roomId} onSuccess={onSuccess} />);
  };

  const renderDevices = devices.length ? (
    devices.map((device) => <Device key={device.imei} {...device} />)
  ) : (
    <p className="devices__no-devices">No devices found</p>
  );

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
