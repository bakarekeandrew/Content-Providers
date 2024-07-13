import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactScreen = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderContact = (item: Contacts.Contact) => {
    const phoneNumber = item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number;
    
    if (item.name && phoneNumber) {
      return (
        <View className=' flex-row pl-3 border-b border-gray-300 text-grey pb-2'>
          <Image 
            source={require('../assets/defaults.png')}
            className='w-16 h-16 rounded-full mt-1'
          />
           <View className='flex-column'>
             <Text className='font-bold text-[20px] pt-3 pl-2'>{item.name}</Text>
             <Text className='pl-2 '>{phoneNumber}</Text>
           </View>
          </View>
      );
    } else if (phoneNumber) {
      return (
        <View>
          <Text>{phoneNumber}</Text>
        </View>
      );
    } else {
      return null; 
    }
  };

  return (
    <SafeAreaView>
      <View className='items-center justify-center pt-6'>
        <Text className='text-[30px] font-bold text-blue-900'>Contact List</Text>
        <Text>---------------------------------------------</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderContact(item)}
      />
    </SafeAreaView>
  );
};


export default ContactScreen;