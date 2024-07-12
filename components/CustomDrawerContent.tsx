import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import ContantScreen from '../screens/ContactScreen';

type Props = DrawerContentComponentProps;

const CustomDrawerContent: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request for permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Allow this app to access the camera roll!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 16, paddingBottom: 40, marginBottom: 20, paddingTop: 20, backgroundColor: '#3182CE' }}>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Image
            source={image ? { uri: image } : require('../assets/andrew.jpg')}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View style={{ marginLeft: 2, marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Andrew Bakareke</Text>
            <Text style={{ fontSize: 14, color: 'white' }}>bakarekeandrew@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#00008B', width: 100, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
      {/* Custom Drawer Items */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 }}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Ionicons name="person-add" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="log-in" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 }}
        onPress={() => navigation.navigate('Calculator')}
      >
        <Ionicons name="calculator" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16 }}>Calculator</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 }}
        onPress={() => navigation.navigate('ContactScreen')}
      >
        <FontAwesome6 name="contact-book" size={24} color="black"  style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16 }}>Contact</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
