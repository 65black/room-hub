import logo from './logo.svg';
import './App.css';
import PebbleHub from './artifacts/contracts/PebbleHub.sol/PebbleHub.json';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const pebbleHubAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const deviceAddresses = ['0xc0ffee254729296a45a3885639AC7E10F9d54979', '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E'];

function App() {
  let contract;
  if (typeof window.ethereum != 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    contract = new ethers.Contract(pebbleHubAddress, PebbleHub.abi, signer);
  }

  useEffect(() => {
    // const addDevicesRequests = deviceAddresses.map((address, index) => contract.addDevice(address, index));
    // Promise.all(addDevicesRequests)
    // .then((data) => {
    //   console.log('data:', data)
    // })
    // .catch(error => {
    //   console.log('error:', error)
    // })
  }, [])

  function requestAccount() {
    // return window.ethereum.request({ method: 'eth_requestAccounts '})
  }

  async function fetchDevices() {
    if (typeof window.ethereum !== 'undefined') {
      // const accounts = await requestAccount();
      // console.log(accounts);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(pebbleHubAddress, PebbleHub.abi, provider);

      console.log(contract);

      try {
        const fetchDevicesRequests = deviceAddresses.map((address) => contract.devices(address));
        const data = await Promise.all(fetchDevicesRequests);
        console.log('data:', data);
      } catch (error) {
        console.log('error:', error);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button type="button" onClick={fetchDevices}>Fetch devices</button>
      </header>
    </div>
  );
}

export default App;
