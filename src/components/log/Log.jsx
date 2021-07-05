import React from 'react'

import { ReactComponent as ScaleIcon } from '../../assets/icons/scale_icon.svg'
import { ReactComponent as RaindropsIcon } from '../../assets/icons/raindrops_icon.svg'
import { ReactComponent as ThermostatIcon } from '../../assets/icons/thermostat_icon.svg'

import './Log.scss'

function Log({ logs }) {
  const renderLogs = Object.entries(logs).map(([logId, logData]) => {
    let statusIcon
    let statusText

    if (logId === 'temperature') {
      statusIcon = <ThermostatIcon className="log__status-icon" />
      statusText = `${logData}°C`
    } else if (logId === 'pressure') {
      statusIcon = <ScaleIcon className="log__status-icon" />
      statusText = `${logData}mmHg`
    } else if (logId === 'humidity') {
      statusIcon = <RaindropsIcon className="log__status-icon" />
      statusText = `${logData}% humidity`
    }

    return (
      <div key={logId} className="log__status">
        {statusIcon}
        <p className="log__status-text">{statusText}</p>
      </div>
    )
  })

  return (
    <div className="log">
      {renderLogs}
    </div>
  )
}

export default Log
