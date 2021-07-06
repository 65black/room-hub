import Button from '../../components/button/Button';
import './AddRoom.scss';

function AddRoom() {
  return (
    <form className="add-room">
      <h2 className="add-room__heading">Setup a new room with desired condition thresholds</h2>

      <label htmlFor="name-input">
        Room name
        <input
          type="text"
          id="name-input"
          className="add-room__input"
          placeholder="e.g Mauna Kea"
        />
      </label>

      <div className="add-room__threshold-container">
        <div className="add-room__threshold-lower">
          <label htmlFor="lower-temperature">
            Lower temperature threshold (in Celsius)
            <input
              type="text"
              id="lower-temperature"
              className="add-room__input"
              placeholder="e.g 15"
            />
          </label>
          <label htmlFor="lower-humidity">
            Lower humidity threshold (in percentage)
            <input
              type="text"
              id="lower-humidity"
              className="add-room__input"
              placeholder="e.g 20"
            />
          </label>
          <label htmlFor="lower-pressure">
            Lower pressure threshold (in mmHg)
            <input
              type="text"
              id="lower-pressure"
              className="add-room__input"
              placeholder="e.g 125"
            />
          </label>
        </div>

        <div className="add-room__threshold-higher">
          <label htmlFor="higher-temperature">
            Higher temperature threshold (in Celsius)
            <input
              type="text"
              id="higher-temperature"
              className="add-room__input"
              placeholder="e.g 35"
            />
          </label>
          <label htmlFor="higher-humidity">
            Higher humidity threshold (in percentage)
            <input
              type="text"
              id="higher-humidity"
              className="add-room__input"
              placeholder="e.g 70"
            />
          </label>
          <label htmlFor="higher-pressure">
            Higher pressure threshold (in mmHg)
            <input
              type="text"
              id="higher-pressure"
              className="add-room__input"
              placeholder="e.g 175"
            />
          </label>
        </div>
      </div>

      <Button type="submit" text="Add room" isPrimary />
    </form>
  );
}

export default AddRoom;
