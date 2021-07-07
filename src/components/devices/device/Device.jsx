import compressAddress from '../../../utilities/compressAddress';
import Button from '../../button/Button';

import './Device.scss';

function Device({ name, imei }) {
  return (
    <div className="device">
      <div className="device__info">
        <p className="device__name">{name}</p>
        <p className="device__imei">{compressAddress(imei)}</p>
      </div>

      <Button text="Copy address" extraClassNames="device__copy-address" isLink />
    </div>
  );
}

export default Device;
