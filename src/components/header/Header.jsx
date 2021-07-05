import React from 'react'

import './Header.scss'

function Header() {
  return (
    <header className="header">
      <button className="header__button" type="button">Home</button>
      <button className="header__button" type="button">Logs</button>
    </header>
  )
}

export default Header
