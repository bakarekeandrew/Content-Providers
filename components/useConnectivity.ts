import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const useConnectivity = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert('Connectivity Alert', 'You are offline. Please check your internet connection.');
      } else {
        Alert.alert('Connectivity Alert', 'You are back online.');
      }
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useConnectivity;
