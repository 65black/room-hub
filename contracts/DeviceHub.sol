pragma solidity 0.5.13;
import './RoomHubInterface.sol';

contract DeviceHub {
  address private owner;
  address private room;

  struct Device {
    address deviceAddress;
    bool isRegistered;
    bool isBlocked;
    string imei;
    string name;
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

  mapping(address => Device) public devices;

  event DeviceAdded(
    string _name,
    string _imei,
    address _deviceAddress
  );
  event DeviceBlocked(
    string _name,
    string _imei,
    address _deviceAddress
  );
  event DeviceUnblocked(
    string _name,
    string _imei,
    address _deviceAddress
  );
  event DeviceVerified(
    string _name,
    string _imei,
    address _deviceAddress
  );
  event LogReceived(
    string id,
    string temperature,
    string pressure,
    string humdity,
    string timestamp,
    bytes32 r,
    bytes32 s
  );

  constructor (address _roomAddress) public {
    // Whoever deploys this contract becomes the owner
    owner = msg.sender;
    room = _roomAddress;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can perform this operation");
    _;
  }

  function addDevice(
    address _deviceAddress,
    string memory _imei,
    string memory _name
  ) public {
    require(devices[_deviceAddress].isRegistered != true, "This device is already registered");
    require(devices[_deviceAddress].isBlocked != true, "This device has been blacklisted");

    bool _isRegistered = true;
    bool _isBlocked = false;

    Device memory _device = Device(
      _deviceAddress,
      _isRegistered,
      _isBlocked,
      _imei,
      _name
    );

    devices[_deviceAddress] = _device;

    emit DeviceAdded(_name, _imei, _deviceAddress);
  }

  function blockDevice(
    address _deviceAddress,
    string memory _imei
  ) onlyOwner public {
    Device memory _device = devices[_deviceAddress];

    _device.isBlocked = true;

    if (_device.isRegistered == true) {
      _device.isRegistered = false;
    }

    emit DeviceBlocked(_device.name, _imei, _deviceAddress);
  }

  function unblockDevice(
    address _deviceAddress,
    string memory _imei
  ) onlyOwner public {
    Device memory _device = devices[_deviceAddress];

    require(_device.isBlocked == true, "This device isn't blacklisted");

    _device.isBlocked = false;

    emit DeviceUnblocked(_device.name, _imei, _deviceAddress);
  }

  function verifyLog(
    string memory _log,
    bytes32 _r,
    bytes32 _s
  ) private {

    bytes32 _logHash = keccak256(bytes(_log));

    bool hit;
    address _deviceAddress;

    uint8[2] memory _valid_v_values = [27, 28];

    for (uint8 _i = 0; _i < _valid_v_values.length; _i++) {
      uint8 _v = _valid_v_values[_i];
      _deviceAddress = ecrecover(_logHash, _v, _r, _s);

      Device memory _device = devices[_deviceAddress];

      if (_device.isRegistered == true) {
        emit DeviceVerified(_device.name, _device.imei, _deviceAddress);

        hit = true;
        break;
      }
    }

    require(_deviceAddress != address(0), "This device is unrecognised");
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
    string memory _log = "{\"message\":{\"temperature\":{_temperature}\"pressure\":{_pressure}\"humidity\":{_humidity}\"timestamp\":{_timestamp}\"}}";

    verifyLog(_log, _r, _s);

    RoomHubInterface _room = RoomHubInterface(room);

    _room.receiveLog(
      _id,
      _temperature,
      _pressure,
      _humidity,
      _timestamp,
      _r,
      _s
    );

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
