import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import db from '../db/firebaseStore';
import {onAuthStateChanged } from 'firebase/auth';
import auth from '../auth/firebase';
const HomeScreen = ({ navigation }) => {
  //load the events here 
  const [event,setEvent] = useState([])
  const [userEmail, setUserEmail] = useState('');

  //fire base logic here 
  const fetchEventData = async () => {
    const eventsCollection = collection(db, "events"); 
    console.log(eventsCollection)
    const eventsSnapshot = await getDocs(eventsCollection);
  
    const eventData = [];
    eventsSnapshot.forEach((doc) => {
      eventData.push(doc.data());
    });
    
    return eventData;
  };

  //load data from firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await fetchEventData();
        setEvent(eventData);
          console .log(event)

      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);
  // Listen for changes in the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUserEmail(user.email);
      } else {
        // User is signed out.
        setUserEmail(''); // or set to a default value
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);
  

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>
  
      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item?.startHour}</Text>
          <Text style={styles.endTime}>{item?.endHour}</Text>
        </View>
  
        <View style={[styles.card, { backgroundColor: item?.bgColor || '#365486' }]}>
          <Text style={styles.cardTitle}>{item?.partName}</Text>
          <Text style={styles.cardDate}>{`${item?.startHour} - ${item?.endHour}`}</Text>
        </View>
      </View>
    </View>
  );
  // Get today's date
  const todayDate = new Date().toLocaleDateString();

  const renderHeader = () => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{event[0]?.name}</Text>
        <Text style={styles.headerSubtitle}>
         {todayDate}
        </Text>
      </View>

      <View style={styles.body}>
        <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
          {userEmail}
          </Text>
          <Text style={styles.userRole}>Visitor</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Event</Text>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={event[0]?.eventParts || []}
        ListHeaderComponent={renderHeader}
        renderItem={renderClassItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>)
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft:16
  },
  card: {
    flex:1,
    backgroundColor: '#7FC7D9',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  headerTitle: {
    color:'#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color:'#ffffff',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#ffffff',
  },
  userRole: {
    fontSize: 12,
    color:'#ffffff',
  },
  classItem: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#365486',
    marginBottom: 8,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#365486',
  },
  classContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  classHours: {
    marginRight: 8,
    alignItems: 'flex-end',
  },
  startTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  endTime: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: 'white',
    marginBottom: 8,
  },
  studentListContainer:{
    marginRight:10,
  },
  studentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -3,
    borderWidth:1,
    borderColor:'#fff'
  },
});

export default HomeScreen;