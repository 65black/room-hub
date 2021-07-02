pragma solidity 0.5.13;

contract RoomHub {
  address private owner;

  struct Plant {
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

  mapping(string => Plant) plants;
  mapping(string => Log) public logs;
  mapping(address => string) public devicesToPlants;
  mapping(string => string) logToPlants;

  event PlantAdded(
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

  function addPlant(
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
    require(plants[_id].isAdded == false, "This plant is already added");

    LogThreshold memory _threshold = LogThreshold(
      _temperatureUpper,
      _temperatureLower,

      _pressureUpper,
      _pressureLower,

      _humidityUpper,
      _humidityLower
    );

    bool _isAdded = true;

    Plant memory _plant = Plant(
      _id,
      _name,
      _timestampAdded,
      _isAdded,
      _threshold
    );

    plants[_id] = _plant;

    emit PlantAdded(_id, _name, _timestampAdded);
  }

  function registerDeviceToPlant(
    address _deviceAddress,
    string memory _plantId
  ) onlyOwner public {
    devicesToPlants[_deviceAddress] = _plantId;
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
