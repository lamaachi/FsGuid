import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import auth from './auth/firebase'; // Import your Firebase authentication instance



const SplashScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      // If a user is connected, navigate to the home screen; otherwise, navigate to the login screen
      setTimeout(()=>{
        if (user) {
          navigation.navigate('Main');
        } else {
          navigation.navigate('Login');
        }
      },4000)
      
    });

    // Clear the listener on component unmount
    return () => unsubscribe();
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Update the path accordingly
        style={styles.logo}
        resizeMode="contain"
      />
    <ActivityIndicator  />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#e8ecf4' 
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
