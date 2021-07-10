import { useEffect, useState } from 'react';
import { useAuth } from '../components/route-guards/RouteGuards';
import samplePebble from '../pebbleDevice.json';
import addLog from './addLog';

function usePebbleData() {
  const { contract } = useAuth();
  const [curentIndex, setCurrentIndex] = useState(0);
  const logData = samplePebble.data;

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      const log = logData[curentIndex];

      if (contract && curentIndex === 0) {
        addLog({ log, contract });
      }

      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 5000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [contract, curentIndex]);
}

export default usePebbleData;
