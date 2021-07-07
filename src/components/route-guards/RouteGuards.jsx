/* eslint-disable no-underscore-dangle */
import { useContext, createContext, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ethers } from 'ethers';

import RoomHub from '../../artifacts/contracts/RoomHub.sol/RoomHub.json';

import Button from '../button/Button';
import ConnectedUser from '../connected-user/ConnectedUser';

const roomHubAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const requestAccount = () => {
  return window.ethereum.request({ method: 'eth_requestAccounts' });
};

function useProvideAuth() {
  const [user, setUser] = useState(() => window.localStorage.getItem('user') || null);
  const [contract, setContract] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await requestAccount();
      setUser(account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const _contract = new ethers.Contract(roomHubAddress, RoomHub.abi, signer);

      setContract(_contract);

      const _isRegistered = await _contract.isRegistered();
      if (!_isRegistered) {
        await _contract.registerUser();
      }

      setIsRegistered(_isRegistered);

      window.localStorage.setItem('user', account);
    } else {
      throw new Error('ethereum not installed on this browser');
    }
  }, []);

  const signin = async (cb) => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await requestAccount();
      setUser(account);
      window.localStorage.setItem('user', account);

      if (cb) {
        cb();
      }
    } else {
      throw new Error('ethereum not installed on this browser');
    }
  };

  return {
    user,
    contract,
    isRegistered,
    signin,
  };
}

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

export function AuthButton() {
  const auth = useAuth();

  return auth.user ? (
    <ConnectedUser userAddress={auth.user} />
  ) : (
    <Button text="Connect with Metamask" handleClick={() => auth.signin()} isPrimary />
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
  const { user, isRegistered } = useAuth();

  let renderContent = <h2>Not connected</h2>;
  if (user) {
    if (!isRegistered) {
      renderContent = <h2>Not registered</h2>;
    } else {
      renderContent = children;
    }
  }

  return <Route {...rest} render={() => renderContent} />;
}
