import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
// import * as firebase from '../firebase';
import HomeScreen from './HomeScreen';
import {app, auth} from '../firebase';
import {getAuth, createUserWithEmailAndPassword} from '@firebase/auth';



const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful signup (e.g., navigate to home screen)
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error(error);
      // Handle signup errors (e.g., display error message)
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 px-3">
      <View className="flex-row">
        <TouchableOpacity className="p-3" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View className="items-center justify-center pl-[20px] pt-10 ">
          <Image
            source={require('../assets/try2.jpg')}
            className="w-60 h-52 rounded-sm"
          />
        </View>
      </View>
      <View className="items-center justify-center pt-3 ">
        <Text className="font-semibold text-[30px] text-[#00008B]">Signup Form</Text>
      </View>
      <View className="items-center justify-center pt-7">
        <TextInput
          placeholder="Email..."
          className="w-80 h-12 border rounded-full p-3 mb-3"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password..."
          className="w-80 h-12 border rounded-full p-3 mb-1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View className="flex-row px-[100px] mb-10">
        <Text>You already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreenStack')}>
          <Text className="text-[#00008B] font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center">
        <TouchableOpacity onPress={handleSignup} className="items-center justify-center w-80 h-12 bg-[#00008B] border rounded-full pt-5 mb-4">
          <Text className="text-white text-[20px] font-semibold">Signup</Text>
          <Text className="mt-3">Or</Text>
        </TouchableOpacity>
        <View className="items-center justify-center mt-4">
            <Text className="font-semibold">Signup with Social Media</Text>

            <View className="flex-row pt-3">
              <TouchableOpacity>
                <Image 
                    source={require("../assets/facebook.png")}
                    className="w-[40px] h-[40px] rounded-full"
                  />
              </TouchableOpacity>

               <TouchableOpacity>
                  <Image 
                      source={require("../assets/insta.png")}
                      className="w-[40px] h-[40px] rounded-full ml-5"
                    />
                </TouchableOpacity> 
                <TouchableOpacity>
                  <Image 
                    source={require("../assets/twitter.png")}
                    className="w-[40px] h-[40px] rounded-full ml-5"
                  />
                </TouchableOpacity>              
                
          </View>
      
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;
