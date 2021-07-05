import React, { useState } from 'react'

import RoomInfo from '../room-info/RoomInfo'
import ConfiguredThreshold from '../configured-threshold/ConfiguredThreshold'
import LogChart from '../log-chart/LogChart'
import Devices from '../devices/Devices'

import getRoom from '../../blockchain-interface/getRoom'
import getDevices from '../../blockchain-interface/getDevices'
import getRoomLogs from '../../blockchain-interface/getLogs'
import prepareLogData from '../../utilities/prepareLogData'

import './Dashboard.scss'

function Dashboard() {
  const [roomId, setRoomId] = useState('mauna-kea')

  let room, devices, logs

  if (roomId) {
    room = getRoom(roomId)
    devices = getDevices(roomId)
    logs = getRoomLogs(roomId)
  }

  const logsData = prepareLogData(logs)

  const renderedCharts = Object.entries(logsData).map(([logId, logData]) => {
    const logStyling = {
      color: logId === 'temperature' ? '#90e0ef' : logId === 'pressure' ? '#003566' : '#2ec4b6',
      yAxisUnit: logId === 'temperature' ? '°C' : logId === 'pressure' ? 'mmHg' : '%'
    }

    console.log({ logId, logData });
    return <LogChart name={logId} key={logId} log={logData} thresholds={room.threshold} {...logStyling} />
  })

  return (
    <div className="dashboard">
      <RoomInfo room={room} latestLog={logs[0]} />
      <ConfiguredThreshold threshold={room.threshold} />
      {renderedCharts}
      <Devices devices={devices} />
    </div>
  )
}

export default Dashboard
