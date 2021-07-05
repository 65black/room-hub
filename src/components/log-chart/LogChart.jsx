import React, { Fragment } from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Brush,
  ReferenceLine
} from 'recharts'

import Card from '../card/Card'
import CustomChartTooltip from './custom-chart-tooltip/CustomChartTooltip'

import './LogChart.scss'

function LogChart({ name, log, color, yAxisUnit, thresholds }) {
  console.log(thresholds);
  return (
    <Card extraClassNames={`log-chart log-chart__${name}`}>
      <ResponsiveContainer>
        <BarChart data={log} barSize={24} margin={{ left: 20 }}>
          <XAxis dataKey="time" />
          <YAxis unit={yAxisUnit} />
          <Tooltip content={CustomChartTooltip} />
          <Legend />

          <ReferenceLine y={thresholds.upper[name]} stroke="#000" />
          <ReferenceLine y={thresholds.lower[name]} stroke="#000" />
          <Brush dataKey="time" height={30} stroke={color} />
          <Bar dataKey={name} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default LogChart
