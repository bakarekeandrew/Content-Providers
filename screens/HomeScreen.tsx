import { View, Text, Switch } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import useConnectivity from '../components/useConnectivity';


const HomeScreen = () => {
  // const batteryLevel = BatteryLevel();
  const isConnected = useConnectivity();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView className={`flex-1 items-center justify-center ${colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Text>This is the HomeScreen</Text>
      <Text >
        By following these steps, your app should be able to persist user sessions and keep users logged in even after they close and reopen the app.
      </Text>


    </SafeAreaView> 
  );
};

export default HomeScreen;
