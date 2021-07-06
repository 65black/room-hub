import React from 'react';

import startCase from '../../../utilities/startCase';

import './CustomChartTooltip.scss';

function CustomChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const { dataKey, payload: data } = payload[0];
    const name = dataKey;
    const value = data[dataKey];
    const { unit } = data;

    return (
      <div className="cct">
        <p className="cct__label">{`${startCase(name)} at ${label} was ${value}${unit}`}</p>
      </div>
    );
  }

  return null;
}

export default CustomChartTooltip;
