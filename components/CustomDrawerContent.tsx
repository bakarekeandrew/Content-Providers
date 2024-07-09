import React from 'react';
import { Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = DrawerContentComponentProps;

const CustomDrawerContent: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 16, paddingBottom: 40, marginBottom: 20, paddingTop: 20, backgroundColor: '#3182CE' }}>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Image
            source={require("../assets/andrew.jpg")}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View style={{ marginLeft: 2, marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Andrew Bakareke</Text>
            <Text style={{ fontSize: 14, color: 'white' }}>bakarekeandrew@gmail.com</Text>
           
          </View>
        </View>
        <TouchableOpacity className="bg-[#00008B] w-24 h-87 items-center justify-center mt-3 rounded-sm">
          <Text className="text-white">Edit Profile</Text>
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
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
