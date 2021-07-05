import React from 'react'
import Card from '../card/Card'
import Device from './device/Device'

import './Devices.scss'

function Devices({ devices }) {
  const renderDevices = devices.map((device) => <Device key={device.imei} {...device} />)

  return (
    <Card extraClassNames="devices">
      <div className="devices__header">
        <p className="devices__heading">Your Devices</p>
        <button className="devices__add-device" type="button">Add new device</button>
      </div>

      <div className="devices__items">
        {renderDevices}
      </div>
    </Card>
  )
}

export default Devices
