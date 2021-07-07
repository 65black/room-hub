import { useParams } from 'react-router-dom';

import ConfigureThreshold from '../../../forms/configure-threshold/ConfigureThreshold';
import { useModalContext } from '../../../state/contexts/modalContext';
import Button from '../../button/Button';

import './NoThreshold.scss';

function NoThreshold({ fetchRoomData }) {
  const { roomId } = useParams();
  const { showModal, hideModal } = useModalContext();

  const handleConfigureThreshold = () => {
    const onSuccess = () => {
      hideModal();
      fetchRoomData();
    };

    showModal(<ConfigureThreshold roomId={roomId} onSuccess={onSuccess} />);
  };

  return (
    <div className="no-threshold">
      <p className="no-threshold__heading">No threshold levels configured</p>

      <Button text="Configure threshold levels" handleClick={handleConfigureThreshold} isPrimary />
    </div>
  );
}

export default NoThreshold;
