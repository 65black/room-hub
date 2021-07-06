import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  LineChart,
  Line,
} from 'recharts';

import Card from '../card/Card';
import CustomChartTooltip from './custom-chart-tooltip/CustomChartTooltip';

import './LogChart.scss';

function LogChart({ name, log, color, yAxisUnit, thresholds }) {
  return (
    <Card extraClassNames={`log-chart log-chart__${name}`}>
      <ResponsiveContainer>
        <LineChart data={log} margin={{ left: name === 'pressure' ? 20 : 0 }}>
          <XAxis dataKey="time" fontSize={12} />
          <YAxis unit={yAxisUnit} fontSize={12} />
          <Tooltip content={CustomChartTooltip} />
          <Legend />

          <ReferenceLine y={thresholds.upper[name]} stroke="#ebecee" />
          <ReferenceLine y={thresholds.lower[name]} stroke="#ebecee" />

          <Line type="monotone" dataKey={name} stroke={color} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default LogChart;
