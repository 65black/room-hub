import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <NavLink className="header__link" to="/">
        Home
      </NavLink>
      <NavLink className="header__link" to="/logs">
        Logs
      </NavLink>
    </header>
  );
}

export default Header;
