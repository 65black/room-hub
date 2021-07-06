import { Link } from 'react-router-dom';

import AddRoom from '../../forms/add-room/AddRoom';
import NoRoom from '../../components/no-room/NoRoom';
import Button from '../../components/button/Button';

import { useModalContext } from '../../state/contexts/modalContext';
import getAllRooms from '../../blockchain-interface/getAllRooms';

import './Rooms.scss';

function Rooms() {
  const { showModal } = useModalContext();

  const handleAddRoom = () => {
    const modalContent = <AddRoom />;
    showModal(modalContent);
  };

  const rooms = getAllRooms();

  if (!rooms.length) return <NoRoom />;

  const renderedRooms = rooms.map((room) => {
    return (
      <Link key={room.id} className="rooms__item" to={`rooms/${room.id}`}>
        {room.name}
      </Link>
    );
  });

  return (
    <section className="rooms">
      <h2 className="rooms__heading">Select a room to view room conditions and manage devices</h2>
      {renderedRooms}

      <Button text="Add a new room" handleClick={handleAddRoom} isPrimary />
    </section>
  );
}

export default Rooms;
