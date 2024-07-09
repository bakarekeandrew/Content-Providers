import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import Calculator from './screens/Calculator';
import { Ionicons } from '@expo/vector-icons';
import { LoginManager } from 'react-native-fbsdk-next';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const SignUpScreenStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const LoginScreenStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const CalculatorScreenStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Calculator" component={Calculator} />
  </Stack.Navigator>
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'SignUpScreenStack') {
          iconName = 'person-add';
        } else if (route.name === 'LoginScreenStack') {
          iconName = 'log-in';
        } else if (route.name === 'CalculatorScreenStack') {
          iconName = 'calculator';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false, // Hide header for all screens in bottom tabs
    })}
  >
    <Tab.Screen name="SignUpScreenStack" component={SignUpScreenStack} options={{ tabBarLabel: 'Signup' }} />
    <Tab.Screen name="LoginScreenStack" component={LoginScreenStack} options={{ tabBarLabel: 'Login' }} />
    <Tab.Screen name="CalculatorScreenStack" component={CalculatorScreenStack} options={{ tabBarLabel: 'Calculator' }} />
    <Tab.Screen name="HomeScreen" component={HomeScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="BottomTabs"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ drawerLabel: 'Tabs' }} />
  </Drawer.Navigator>
);

export default function App() {

  // useEffect(() => {
  //   try {
  //     LoginManager.setLoginBehavior('native_only');
  //     console.log('Facebook LoginManager initialized successfully');
  //   } catch (error) {
  //     console.error('Error initializing Facebook LoginManager:', error);
  //   }
  // }, []);
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
