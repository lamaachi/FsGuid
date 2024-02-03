// GridButtonsScreen.js
import React from 'react';
import { useState,useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text,TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import db from '../db/firebaseStore';


const GridButtonsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  // const [data, setData] = useState([]);

  useEffect(() => {
    // Filter data based on searchQuery
    const filtered = data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredData(filtered);
  }, [searchQuery]);

  const data = [
    { id: '1', title: 'Nouelle Biblioteque', latitude: 33.225057, longitude: -8.488439 },
    // { id: '11', title: 'Old Biblioteque', latitude: 33.226247, longitude:   },
    { id: '2', title: 'Student Buvete',latitude:33.225100,longitude: -8.485768 },
    { id: '3', title: 'Prof Buvete',latitude:33.226199,longitude: -8.487530 },
    { id: '4', title: 'Parking',latitude:33.226625,longitude: -8.487444 },
    { id: '5', title: 'CED & Anapec',latitude:33.225495,longitude: -8.488429 },
    { id: '6', title: 'Tech Center',latitude:33.224977,longitude:-8.488013 },
    { id: '7', title: 'Grand Amphi',latitude:33.224722,longitude: -8.487646 },
    { id: '8', title: 'Mosque',latitude:33.224683,longitude: -8.488106 },
    { id: '9', title: 'Terain',latitude:33.224455,longitude: -8.487514 },
    { id: '10', title: 'Dep Informatique',latitude:33.224974,longitude: -8.487582 },
  ];

  
  

  const handleButtonPress = (item) => {
    // Check if latitude and longitude are defined
    if (item.latitude !== undefined && item.longitude !== undefined) {
      // Navigate to the MapsScreen
      navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude,title:item.title });
    } else {
      // Display an alert for the case where latitude or longitude is undefined
      Alert.alert('Invalid Coordinates', 'Latitude or longitude is undefined for this location.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(item)}>
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.searchBar}
      placeholder="Search..."
      value={searchQuery}
      onChangeText={(text) => setSearchQuery(text)}
    />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#e8ecf4' 
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GridButtonsScreen;
