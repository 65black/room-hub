import { Link } from 'react-router-dom';

import AddRoom from '../../forms/add-room/AddRoom';
import NoRoom from '../../components/no-room/NoRoom';
import Button from '../../components/button/Button';
import { useAuth } from '../../components/route-guards/RouteGuards';

import { useModalContext } from '../../state/contexts/modalContext';
import useRooms from '../../blockchain-interface/useRooms';

import './Rooms.scss';

function Rooms() {
  const { contract } = useAuth();
  const [roomsState, fetchRooms] = useRooms({ contract });
  const { showModal, hideModal } = useModalContext();

  const { isLoading, rooms } = roomsState;

  const handleAddRoom = () => {
    const onSuccess = () => {
      hideModal();
      fetchRooms();
    };

    const modalContent = <AddRoom onSuccess={onSuccess} />;
    showModal(modalContent);
  };

  if (isLoading) return <p>loading...</p>;

  if (!rooms.length) return <NoRoom />;

  const renderedRooms = rooms.map((room) => {
    return (
      <Link key={room.id} className="rooms__item" to={`/${room.id}`}>
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
