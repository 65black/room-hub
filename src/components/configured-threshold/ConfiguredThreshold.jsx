import React from 'react';

import Card from '../card/Card';
import Log from '../log/Log';
import NoThreshold from './no-threshold/NoThreshold';

import './ConfiguredThreshold.scss';

function ConfiguredThreshold({ threshold, fetchRoomData }) {
  const renderThresholdLimits = threshold ? (
    Object.entries(threshold).map(([limitId, limit]) => {
      return (
        <div key={limitId} className="configured-threshold__limit">
          <p className="configured-threshold__limit-id">{limitId} limit</p>
          <Log logs={limit} />
        </div>
      );
    })
  ) : (
    <NoThreshold fetchRoomData={fetchRoomData} />
  );

  return (
    <Card extraClassNames="configured-threshold">
      <p className="configured-threshold__heading">Threshold levels</p>

      {renderThresholdLimits}
    </Card>
  );
}

export default ConfiguredThreshold;
