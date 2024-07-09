import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const useBatteryLevel = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const level = await DeviceInfo.getBatteryLevel() as number;
      setBatteryLevel(level);
      if (level >= 0.8) {
        Alert.alert('Battery Alert', 'Battery level has reached 90%');
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return batteryLevel;
};

export default useBatteryLevel;
