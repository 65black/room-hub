import React from 'react';

import AddRoom from '../../forms/add-room/AddRoom';

import { useModalContext } from '../../state/contexts/modalContext';

import './NoRoom.scss';

function NoRoom() {
  const { showModal } = useModalContext();

  const addRoom = () => {
    const modalContent = <AddRoom />;
    showModal(modalContent);
  };

  return (
    <section className="no-room">
      <h2 className="no-room__heading">No rooms set up</h2>

      <p className="no-room__description">
        Add a new room, connect devices, and view your room conditions here
      </p>

      <button type="button" onClick={addRoom} className="no-room__add-room">
        Add room
      </button>
    </section>
  );
}

export default NoRoom;
