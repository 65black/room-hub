import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Actions from './components/actions/Actions';

import Container from './components/container/Container';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import Rooms from './pages/rooms/Rooms';
import Room from './pages/room/Room';

import { PrivateRoute } from './components/route-guards/RouteGuards';
// import usePebbleData from './blockchain-interface/usePebbleData';

import './App.scss';

function App() {
  // usePebbleData();

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
