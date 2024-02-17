import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export default db;
