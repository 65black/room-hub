pragma solidity 0.5.13;

contract RoomHub {
  address private owner;

  struct Room {
    string id;
    string name;
    string timestampAdded;
    bool isAdded;
    LogThreshold threshold;
  }

  struct LogThreshold {
    string temperatureUpper;
    string temperatureLower;

    string pressureUpper;
    string pressureLower;

    string humidityUpper;
    string humidityLower;
  }

  struct Log {
    string id;
    string temperature;
    string pressure;
    string humidity;
    string timestamp;
    bytes32 r;
    bytes32 s;
  }

  mapping(string => Room) rooms;
  mapping(string => Log) public logs;
  mapping(address => string) public devicesToRooms;
  mapping(string => string) logToPlants;

  event RoomAdded(
    string _id,
    string _name,
    string _timestampAdded
  );
  event LogReceived(
    string _id,
    string _temperature,
    string _pressure,
    string _humidity,
    string _timestamp,
    bytes32 _r,
    bytes32 _s
  );

  constructor () public {
    // Whoever deploys this contract becomes the owner
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can perform this operation");
    _;
  }

  function addRoom(
    string memory _id,
    string memory _name,

    string memory _temperatureUpper,
    string memory _temperatureLower,

    string memory _pressureUpper,
    string memory _pressureLower,

    string memory _humidityUpper,
    string memory _humidityLower,

    string memory _timestampAdded
  ) onlyOwner public {
    require(rooms[_id].isAdded == false, "This room is already added");

    LogThreshold memory _threshold = LogThreshold(
      _temperatureUpper,
      _temperatureLower,

      _pressureUpper,
      _pressureLower,

      _humidityUpper,
      _humidityLower
    );

    bool _isAdded = true;

    Room memory _room = Room(
      _id,
      _name,
      _timestampAdded,
      _isAdded,
      _threshold
    );

    rooms[_id] = _room;

    emit RoomAdded(_id, _name, _timestampAdded);
  }

  function registerDeviceToRoom(
    address _deviceAddress,
    string memory _roomId
  ) onlyOwner public {
    devicesToRooms[_deviceAddress] = _roomId;
  }

  function receiveLog(
    string memory _id,
    string memory _temperature,
    string memory _pressure,
    string memory _humidity,
    string memory _timestamp,
    bytes32 _r,
    bytes32 _s
  ) public {
    Log memory _log = Log(
      _id,
      _temperature,
      _pressure,
      _humidity,
      _timestamp,
      _r,
      _s
    );

    logs[_id] = _log;

    // TODO: If log thresholds violated, add to logsToPlants

    emit LogReceived(
      _id,
      _temperature,
      _pressure,
      _humidity,
      _timestamp,
      _r,
      _s
    );
  }

}
