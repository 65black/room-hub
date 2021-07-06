import React from 'react';

import Card from '../card/Card';
import Log from '../log/Log';

import './ConfiguredThreshold.scss';

function ConfiguredThreshold({ threshold }) {
  const renderThresholdLimits = Object.entries(threshold).map(([limitId, limit]) => {
    return (
      <div key={limitId} className="configured-threshold__limit">
        <p className="configured-threshold__limit-id">{limitId} limit</p>
        <Log logs={limit} />
      </div>
    );
  });

  return (
    <Card extraClassNames="configured-threshold">
      <p className="configured-threshold__heading">Threshold levels</p>

      {renderThresholdLimits}
    </Card>
  );
}

export default ConfiguredThreshold;
