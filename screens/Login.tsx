import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import {app, auth} from '../firebase';
import {getAuth, signInWithEmailAndPassword, signInWithCredential,FacebookAuthProvider} from '@firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    const handleLogin = async () => {
     try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       navigation.navigate("HomeScreen");
      } catch (error) {
        console.error(error);
      // Handle login errors (e.g., display error message)
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // await FacebookSdk.initializeAsync();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
  
      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
  
      // Create a Firebase credential with the AccessToken
      // const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

      const auth = getAuth(app);
  
      // Sign-in the user with the credential
      const credential = FacebookAuthProvider.credential(data.accessToken);
      const user = await signInWithCredential(auth,credential);
      console.log(user);
      // console.log('User signed in successfully:', credential.user);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };
  const navigation = useNavigation();

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
            source={require('../assets/try.jpg')}
            className="w-60 h-52 rounded-sm"
          />
        </View>
      </View>
      <View className="items-center justify-center pt-3 ">
        <Text className="font-semibold text-[30px] text-[#00008B]">Login Form</Text>
      </View>
      <View className="items-center justify-center pt-12">
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
        <Text>You Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreenStack')}>
          <Text className="text-[#00008B] font-semibold">Signup</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center ">
        <TouchableOpacity onPress={handleLogin} className="items-center justify-center w-80 h-12 bg-[#00008B] border rounded-full pt-5 mb-4">
          <Text className="text-white text-[20px] font-semibold ">Login</Text>
          <Text className="mt-3">Or</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center mt-4">
            <Text className="font-semibold">Signup with Social Media</Text>
            <View className="flex-row pt-3">
              <TouchableOpacity onPress={handleFacebookLogin}>
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
          
    </SafeAreaView>
  );
}

export default Login;
