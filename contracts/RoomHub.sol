pragma solidity 0.5.13;

contract RoomHub {
  address private owner;

  struct User {
    address userAddress;
    bool isAdded;
    string[] roomIds;
  }
  mapping(address => User) public users;

  struct Room {
    string id;
    string name;
    string timestampAdded;
    bool isAdded;
    address[] deviceAddresses;
    string[] logIds;
  }
  mapping(string => Room) public rooms;
  mapping(string => RoomThreshold) public roomToThreshold;
  mapping(string => address) public roomsToOwners;

  struct RoomThreshold {
    string temperatureUpper;
    string temperatureLower;

    string pressureUpper;
    string pressureLower;

    string humidityUpper;
    string humidityLower;
  }
  mapping(string => RoomThreshold) public roomThresholds;

  struct Log {
    address deviceAddress;
    string id;
    string temperature;
    string pressure;
    string humidity;
    string timestamp;
    bytes32 r;
    bytes32 s;
  }
  mapping(string => Log) public logs;

  struct Device {
    address deviceAddress;
    string name;
    string imei;
    bool isRegistered;
    bool isBlocked;
  }
  mapping(address => Device) public devices;
  mapping(address => string) public deviceAddressesToRoomIds;


  event LogAdded(
    address deviceAddress,
    string id,
    string temperature,
    string pressure,
    string humidity,
    string timestamp
  );

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can perform this operation");
    _;
  }

  modifier registeredUser() {
    require(users[msg.sender].isAdded, "Only a registered user can perform this operation");
    _;
  }

  modifier canAccessRoom(string memory _roomId) {
    require(roomsToOwners[_roomId] == msg.sender, "You don't have access to this room");
    _;
  }

  constructor () public {
    // Whoever deploys this contract becomes the owner
    owner = msg.sender;
  }

  function isOwner() public view returns (bool _isOwner) {
    _isOwner = msg.sender == owner;
    return _isOwner;
  }

  function isRegistered() public view returns (bool _isRegistered) {
    _isRegistered = users[msg.sender].isAdded;
    return _isRegistered;
  }

  function registerUser() public {
    users[msg.sender] = User(
      msg.sender,
      true,
      new string[](0)
    );
  }

  function addRoomThreshold(
    string memory _roomId,
    string memory _temperatureUpper,
    string memory _temperatureLower,

    string memory _pressureUpper,
    string memory _pressureLower,

    string memory _humidityUpper,
    string memory _humidityLower
  ) canAccessRoom(_roomId) public {
    // Initialise a room threshold variable
    RoomThreshold memory _threshold = RoomThreshold(
      _temperatureUpper,
      _temperatureLower,

      _pressureUpper,
      _pressureLower,

      _humidityUpper,
      _humidityLower
    );
    roomThresholds[_roomId] = _threshold;
  }

  function addRoom(
    string memory _id,
    string memory _name,
    string memory _timestampAdded
  ) public returns (uint _roomIdIndex) {
    // Get the user's address
    address _userAddress = msg.sender;

    User storage _user = users[msg.sender];

    // If the user doesn't already exist
    if (_user.isAdded != true) {
      string[] memory _roomIds;

      _user.userAddress = msg.sender;
      _user.roomIds = _roomIds;
      _user.isAdded = true;
    }

    bool _isRoomAdded = true;
    address[] memory _deviceAddresses;
    string[] memory _logIds;

    // Initialise a room variable
    Room memory _room = Room(
      _id,
      _name,
      _timestampAdded,
      _isRoomAdded,
      _deviceAddresses,
      _logIds
    );

    // Add room to rooms struct using the room id as lookup
    rooms[_id] = _room;

    // Adds room's owner
    roomsToOwners[_id] = _userAddress;

    // Add the room ID to the array of roomIDs and return the room ID index
    return users[_userAddress].roomIds.push(_id) - 1;
  }

  function getRoomsCount() registeredUser public view returns (uint _roomsCount) {
    return users[msg.sender].roomIds.length;
  }

  function getRoomIdAtIndex(
    uint _index
  ) registeredUser public view returns (string memory _roomId) {
    return users[msg.sender].roomIds[_index];
  }

  function getRoomDevicesCount(
    string memory _roomId
  ) registeredUser public view returns (uint _roomDevicesCount) {
    return rooms[_roomId].deviceAddresses.length;
  }

  function getRoomDeviceIdAtIndex(
    string memory _roomId,
    uint _deviceIndex
  ) registeredUser public view returns (address _deviceAddress) {
    return rooms[_roomId].deviceAddresses[_deviceIndex];
  }

  function blockDevice(
    address _deviceAddress
  ) onlyOwner public view {
    Device memory _device = devices[_deviceAddress];

    _device.isBlocked = true;
  }

  function unblockDevice(
    address _deviceAddress
  ) onlyOwner public view {
    Device memory _device = devices[_deviceAddress];

    require(_device.isBlocked == true, "This device isn't blacklisted");

    _device.isBlocked = false;
  }

  function addDevice(
    address _deviceAddress,
    string memory _roomId,
    string memory _name,
    string memory _imei
  ) registeredUser public returns (uint _deviceAddressIndex) {
    require(devices[_deviceAddress].isRegistered != true, "This device is already registered");
    require(devices[_deviceAddress].isBlocked != true, "This device has been blacklisted");

    bytes memory _imeiBytes = bytes(_imei);
    require(_imeiBytes.length != 0, "IMEI field missing");

    bytes memory _nameBytes = bytes(_name);
    require(_nameBytes.length != 0, "Name field missing");

    Room storage _room = rooms[_roomId];

    bool _isRegistered = true;
    bool _isBlocked = false;
    Device memory _device = Device(
      _deviceAddress,
      _name,
      _imei,
      _isRegistered,
      _isBlocked
    );

    devices[_deviceAddress] = _device;
    deviceAddressesToRoomIds[_deviceAddress] = _roomId;

    return _room.deviceAddresses.push(_deviceAddress) - 1;
  }

  function verifyLog(
    string memory _log,
    bytes32 _r,
    bytes32 _s
  ) private view returns (address _deviceAddress) {
    bytes32 _logHash = keccak256(bytes(_log));

    bool hit;
    uint8[2] memory _valid_v_values = [27, 28];

    for (uint8 _i = 0; _i < _valid_v_values.length; _i++) {
      uint8 _v = _valid_v_values[_i];
      _deviceAddress = ecrecover(_logHash, _v, _r, _s);

      Device memory _device = devices[_deviceAddress];

      if (_device.isRegistered == true) {
        hit = true;
        break;
      }
    }

    require(_deviceAddress != address(0), "This device is unrecognised");
    return _deviceAddress;
  }

  function addLog(
    string memory _id,
    string memory _temperature,
    string memory _pressure,
    string memory _humidity,
    string memory _timestamp,
    bytes32 _r,
    bytes32 _s
  ) public {
    string memory _logString = "{\"message\":{\"temperature\":{_temperature}\"humidity\":{_humidity}\"pressure\":{_pressuree}\"timestamp\":{_timestamp}\"}}";

    address _deviceAddress = verifyLog(_logString, _r, _s);

    Log memory _log = Log(
      _deviceAddress,
      _id,
      _temperature,
      _pressure,
      _humidity,
      _timestamp,
      _r,
      _s
    );

    logs[_id] = _log;

    string storage _roomId = deviceAddressesToRoomIds[_deviceAddress];

    Room storage _room = rooms[_roomId];
    _room.logIds.push(_id);

    emit LogAdded(
      _deviceAddress,
      _id,
      _temperature,
      _pressure,
      _humidity,
      _timestamp
    );
  }

  function getRoomLogsCount(
    string memory _roomId
  ) registeredUser public view returns (uint _roomLogsCount) {
    return rooms[_roomId].logIds.length;
  }

  function getRoomLogIdAtIndex(
    string memory _roomId,
    uint _logIndex
  ) registeredUser public view returns (string memory _logId) {
    return rooms[_roomId].logIds[_logIndex];
  }
}
