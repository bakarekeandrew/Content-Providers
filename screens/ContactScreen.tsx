import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'react-native-contact';

const ContactScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    };

    loadContacts();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ paddingLeft: 16, alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Contact List</Text>
        <Text>-----------------------------------------</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id ?? ''}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
              <Text key={index}>{phone.label}: {phone.number}</Text>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ContactScreen;
