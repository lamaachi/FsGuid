import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import auth from './auth/firebase'; // Import your Firebase authentication instance
import { Card } from "react-native-elements";


const SplashScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      setTimeout(()=>{
        auth.onAuthStateChanged(user => {
          if(user && user.emailVerified){
            navigation.navigate('Main');
          }else{
            navigation.navigate('Login');
          }
        })
      },4000);
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Update the path accordingly
        style={styles.logo}
        resizeMode="contain"
      />
    <ActivityIndicator size={40} color='blue' />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: "white"
    // backgroundColor: 'white', // Set the background color to white
  },
  logo: {
    width: '60%', // Adjust the width as needed
    height: '60%', // Adjust the height as needed
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
