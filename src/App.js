import './App.scss';
import Actions from './components/actions/Actions';

import Container from './components/container/Container';
import Dashboard from './components/dashboard/Dashboard';
// import PebbleHub from './artifacts/contracts/PebbleHub.sol/PebbleHub.json';
// import { ethers } from 'ethers';

import Header from './components/header/Header';
// import { useEffect } from 'react';

// const pebbleHubAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

// const deviceAddresses = ['0x70997970c51812dc3a010c7d01b50e0d17dc79c8', '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc'];

function App() {
  // let contract;
  // if (typeof window.ethereum != 'undefined') {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner()
  //   contract = new ethers.Contract(pebbleHubAddress, PebbleHub.abi, signer);
  // }

  // useEffect(() => {
  //   const addDevicesRequests = deviceAddresses.map((address, index) => contract.addDevice(address, index));
  //   Promise.all(addDevicesRequests)
  //   .then((data) => {
  //     console.log('data:', data)
  //   })
  //   .catch(error => {
  //     console.log('error:', error)
  //   })
  // }, [])

  function requestAccount() {
    // return window.ethereum.request({ method: 'eth_requestAccounts '})
  }

  // async function fetchDevices() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     // const accounts = await requestAccount();
  //     // console.log(accounts);

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const contract = new ethers.Contract(pebbleHubAddress, PebbleHub.abi, provider);

  //     console.log(contract);
  //     // console.log({ d: contract.devices(deviceAddresses[0])})

  //     try {
  //       const fetchDevicesRequests = deviceAddresses.map((address) => contract.devices(address));
  //       // const data = await Promise.all(fetchDevicesRequests);
  //       console.log('data:', data);
  //     } catch (error) {
  //       console.log('error:', error);
  //     }
  //   }
  // }

  return (
    <div className="App">
      <Container>
        <Header />
        <Dashboard />
        <Actions />
      </Container>
    </div>
  );
}

export default App;
