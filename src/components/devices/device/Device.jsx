import React from 'react'

import './Device.scss'

function Device({ name, imei, address }) {
  return (
    <div className="device">
      <div className="device__info">
        <p className="device__name">{name}</p>
        <p className="device__imei">{imei}</p>
      </div>

      <button className="device__copy-address" type="button">copy address</button>
    </div>
  )
}

export default Device
