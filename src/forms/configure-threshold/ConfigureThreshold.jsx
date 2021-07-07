import { useState } from 'react';
import Button from '../../components/button/Button';
import { useAuth } from '../../components/route-guards/RouteGuards';

import './ConfigureThreshold.scss';

function ConfigureThreshold({ roomId, onSuccess }) {
  const [formState, setFormState] = useState({
    lowerTemperature: '',
    higherTemperature: '',
    lowerHumidity: '',
    higherHumidity: '',
    lowerPressure: '',
    higherPressure: '',
  });
  const { contract } = useAuth();

  const handleInputChange = (field) => (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transaction = await contract.addRoomThreshold(
      roomId,
      formState.higherTemperature,
      formState.lowerTemperature,
      formState.higherHumidity,
      formState.lowerHumidity,
      formState.higherPressure,
      formState.lowerPressure,
    );

    await transaction.wait();

    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <form className="configure-threshold" onSubmit={handleSubmit}>
      <h2 className="configure-threshold__heading">Configure threshold levels</h2>
      <div className="configure-threshold__threshold-container">
        <div className="configure-threshold__threshold-lower">
          <label htmlFor="lower-temperature">
            Lower temperature threshold (in Celsius)
            <input
              type="text"
              id="lower-temperature"
              className="configure-threshold__input"
              placeholder="e.g 15"
              value={formState.lowerTemperature}
              onChange={handleInputChange('lowerTemperature')}
            />
          </label>
          <label htmlFor="lower-humidity">
            Lower humidity threshold (in percentage)
            <input
              type="text"
              id="lower-humidity"
              className="configure-threshold__input"
              placeholder="e.g 20"
              value={formState.lowerHumidity}
              onChange={handleInputChange('lowerHumidity')}
            />
          </label>
          <label htmlFor="lower-pressure">
            Lower pressure threshold (in mmHg)
            <input
              type="text"
              id="lower-pressure"
              className="configure-threshold__input"
              placeholder="e.g 125"
              value={formState.lowerPressure}
              onChange={handleInputChange('lowerPressure')}
            />
          </label>
        </div>

        <div className="configure-threshold__threshold-higher">
          <label htmlFor="higher-temperature">
            Higher temperature threshold (in Celsius)
            <input
              type="text"
              id="higher-temperature"
              className="configure-threshold__input"
              placeholder="e.g 35"
              value={formState.higherTemperature}
              onChange={handleInputChange('higherTemperature')}
            />
          </label>
          <label htmlFor="higher-humidity">
            Higher humidity threshold (in percentage)
            <input
              type="text"
              id="higher-humidity"
              className="configure-threshold__input"
              placeholder="e.g 70"
              value={formState.higherHumidity}
              onChange={handleInputChange('higherHumidity')}
            />
          </label>
          <label htmlFor="higher-pressure">
            Higher pressure threshold (in mmHg)
            <input
              type="text"
              id="higher-pressure"
              className="configure-threshold__input"
              placeholder="e.g 175"
              value={formState.higherPressure}
              onChange={handleInputChange('higherPressure')}
            />
          </label>
        </div>
      </div>

      <Button type="submit" text="Add thresholds" isPrimary />
    </form>
  );
}

export default ConfigureThreshold;
