import { useState } from 'react';
import Button from '../../components/button/Button';
import { useAuth } from '../../components/route-guards/RouteGuards';

import './AddDevice.scss';

function AddDevice({ roomId, onSuccess }) {
  const { contract } = useAuth();
  const [formState, setFormState] = useState({
    name: '',
    imei: '',
    address: '',
  });

  const handleInputChange = (field) => (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const transaction = await contract.addDevice(
      formState.address,
      roomId,
      formState.name,
      formState.imei,
    );

    await transaction.wait();

    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <form className="add-device" onSubmit={handleFormSubmit}>
      <h2 className="add-device__heading">Add a new device</h2>

      <label className="add-device__label">
        Device name
        <input
          type="text"
          className="add-device__input"
          placeholder="e.g North-West corner"
          value={formState.name}
          onChange={handleInputChange('name')}
        />
      </label>

      <label className="add-device__label">
        Device IMEI
        <input
          type="text"
          className="add-device__input"
          placeholder="e.g 12345678901"
          value={formState.imei}
          onChange={handleInputChange('imei')}
        />
      </label>

      <label className="add-device__label">
        Device Address
        <input
          type="text"
          className="add-device__input"
          placeholder="e.g 0xa83cba2f99ba23dee10"
          value={formState.address}
          onChange={handleInputChange('address')}
        />
      </label>

      <Button type="submit" text="Add device" extraClassNames="add-device__button" isPrimary />
    </form>
  );
}

export default AddDevice;
