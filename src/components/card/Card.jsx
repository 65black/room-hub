import React from 'react'

import './Card.scss'

function Card({ children, extraClassNames }) {
  const className = `card ${extraClassNames}`;

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Card
