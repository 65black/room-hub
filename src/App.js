import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Actions from './components/actions/Actions';

import Container from './components/container/Container';
import Rooms from './pages/rooms/Rooms';
// import PebbleHub from './artifacts/contracts/PebbleHub.sol/PebbleHub.json';

import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import Room from './pages/room/Room';
// import { useEffect } from 'react';
import './App.scss';
import { PrivateRoute } from './components/route-guards/RouteGuards';

// const deviceAddresses =
// ['0x70997970c51812dc3a010c7d01b50e0d17dc79c8', '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc'];

function App() {
  // useEffect(() => {
  //   const addDevicesRequests = deviceAddresses
  //     .map((address, index) => contract.addDevice(address, index));
  //   Promise.all(addDevicesRequests)
  //   .then((data) => {
  //     console.log('data:', data)
  //   })
  //   .catch(error => {
  //     console.log('error:', error)
  //   })
  // }, [])

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
    <Router>
      <div className="App">
        <Container>
          <Breadcrumbs />

          <Switch>
            <PrivateRoute exact path="/">
              <Rooms />
            </PrivateRoute>

            <PrivateRoute path="/:roomId">
              <Room />
            </PrivateRoute>
          </Switch>
          <Actions />
        </Container>
      </div>
    </Router>
  );
}

export default App;
