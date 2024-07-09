import { initializeApp } from '@firebase/app';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyAnRdI1kVLCyrZ0OBY4vLb3l1xHPwopdLg",
    authDomain: "second-assignment-67791.firebaseapp.com",
    projectId: "second-assignment-67791",
    storageBucket: "second-assignment-67791.appspot.com",
    messagingSenderId: "1003845144065",
    appId: "1:1003845144065:web:d49304cdf9d4bdade13a00"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export {auth, app};
