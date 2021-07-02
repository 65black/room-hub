pragma solidity 0.5.13;

contract RoomHubInterface {
  function receiveLog(
    string memory _id,
    string memory _temperature,
    string memory _pressure,
    string memory _humidity,
    string memory _timestamp,
    bytes32 _r,
    bytes32 _s
  ) public;
}
