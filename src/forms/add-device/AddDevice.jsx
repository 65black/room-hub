import Button from '../../components/button/Button';

import './AddDevice.scss';

function AddDevice() {
  return (
    <form className="add-device">
      <h2 className="add-device__heading">Add a new device</h2>

      <label className="add-device__label">
        Device name
        <input type="text" className="add-device__input" placeholder="e.g North-West corner" />
      </label>

      <label className="add-device__label">
        Device IMEI
        <input type="text" className="add-device__input" placeholder="e.g 12345678901" />
      </label>

      <label className="add-device__label">
        Device Address
        <input type="text" className="add-device__input" placeholder="e.g 0xa83cba2f99ba23dee10" />
      </label>

      <Button type="submit" text="Add device" extraClassNames="add-device__button" isPrimary />
    </form>
  );
}

export default AddDevice;
