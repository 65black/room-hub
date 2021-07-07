import { useState } from 'react';
import Button from '../../components/button/Button';
import { useAuth } from '../../components/route-guards/RouteGuards';
import './AddRoom.scss';

function AddRoom({ onSuccess }) {
  const [roomName, setRoomName] = useState('');

  const { contract } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const roomId = roomName.toLowerCase().split(' ').join('-');
    const timeStampAdded = new Date().toUTCString();

    const transaction = await contract.addRoom(roomId, roomName, timeStampAdded);
    await transaction.wait();

    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <form className="add-room" onSubmit={handleSubmit}>
      <h2 className="add-room__heading">Setup a new room with desired condition thresholds</h2>

      <label htmlFor="name-input">
        Room name
        <input
          type="text"
          id="name-input"
          className="add-room__input"
          placeholder="e.g Mauna Kea"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
        />
      </label>

      <Button type="submit" text="Add room" isPrimary />
    </form>
  );
}

export default AddRoom;
