import './EmptyRoom.scss';

function EmptyRoom() {
  return (
    <section className="empty-room">
      <h2 className="empty-room__heading">No data collected for this room</h2>

      <p className="empty-room__description">
        Either add a device, or wait for the devices to start collecting data
      </p>
    </section>
  );
}

export default EmptyRoom;
