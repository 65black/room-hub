async function getRooms(contract) {
  let rooms = [];

  const userRoomsCount = (await contract.getRoomsCount()).toNumber();
  if (userRoomsCount > 0) {
    let roomIds = [];
    for (let i = 0; i < userRoomsCount; i += 1) {
      roomIds.push(contract.getRoomIdAtIndex(i));
    }

    roomIds = await Promise.all(roomIds);

    for (let i = 0; i < roomIds.length; i += 1) {
      const roomId = roomIds[i];
      rooms.push(contract.rooms(roomId));
    }

    rooms = (await Promise.all(rooms)).map((room) => ({
      id: room.id,
      name: room.name,
      timestampAdded: room.timestampAdded,
    }));
  }

  return rooms;
}

export default getRooms;
