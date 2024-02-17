import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import db from './db/firebaseStore';
const AddEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  // Add more state variables for other event details

  const handleSubmit = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      await addDoc(eventsCollection, {
        name: eventName,
        location: eventLocation,
        // Add more fields here for other event details
        createdAt: serverTimestamp(),
      });
      // Clear input fields after submitting
      setEventName('');
      setEventLocation('');
      // Add similar logic for other state variables
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={eventLocation}
        onChangeText={setEventLocation}
      />
      {/* Add more input fields for other event details */}
      <Button title="Add Event" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default AddEventForm;
