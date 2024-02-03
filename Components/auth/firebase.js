// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth} from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANK0Jdwufr1mvm2lA6U7uikzRhf8YjLhI",
  authDomain: "fsguid.firebaseapp.com",
  projectId: "fsguid",
  storageBucket: "fsguid.appspot.com",
  messagingSenderId: "421285277780",
  appId: "1:421285277780:web:0903538b26f17540f43dc1",
  measurementId: "G-QNB5QPDMFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
