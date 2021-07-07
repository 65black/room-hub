import compressAddress from '../../utilities/compressAddress';

import './ConnectedUser.scss';

function ConnectedUser({ userAddress }) {
  const compressedAddress = compressAddress(userAddress);

  return <span className="connected-user">Address {compressedAddress} connected</span>;
}

export default ConnectedUser;
