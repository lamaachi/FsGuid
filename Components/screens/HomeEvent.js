import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import db from "../db/firebaseStore";
import { Card } from "react-native-elements";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../auth/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
const HomeEvent = ({ navigation }) => {
  //load the events here
  const [event, setEvent] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  //fire base logic here
  const fetchEventData = async () => {
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventData = [];
    eventsSnapshot.forEach((doc) => {
      eventData.push(doc.data());
    });
    return eventData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await fetchEventData();
        setEvent(eventData);

        // Set up a real-time listener for changes to the events collection
        const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
          const updatedEventData = [];
          snapshot.forEach((doc) => {
            updatedEventData.push(doc.data());
          });
          setEvent(updatedEventData);
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });

    return () => unsubscribe();
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

        <View
          style={[styles.card, { backgroundColor: item?.bgColor || "#365486" }]}
        >
          <Text style={styles.cardTitle}>{item?.partName}</Text>
          {/* <Text style={styles.cardDate}>{`${item?.startHour} - ${item?.endHour}`}</Text> */}
        </View>
      </View>
    </View>
  );
  // Get today's date
  const todayDate = new Date().toLocaleDateString();
  const handleLocationPress = () => {
    if (event.length > 0) {
      // Check if latitude and longitude are defined
      if (
        event[0].location.latitude !== undefined &&
        event[0].location.longitude !== undefined
      ) {
        // Navigate to the MapsScreen
        navigation.navigate("Map", {
          latitude: event[0].location.latitude,
          longitude: event[0].location.longitude,
        });
      } else {
        // Display an alert for the case where latitude or longitude is undefined
        Alert.alert(
          "Invalid Coordinates",
          "Latitude or longitude is undefined for this location."
        );
      }
    }
  };
  const renderHeader = () => (
    <View>
      <Image
        source={{ uri: event[0]?.image }}
        style={{
          width: "100%",
          height: 200,
          marginTop:5,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{event[0]?.name}</Text>
            <Text style={styles.headerSubtitle}>{todayDate}</Text>
          </View>
          <TouchableOpacity onPress={handleLocationPress}>
            <FontAwesome name="map-marker" style={styles.locationIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome To FSJ</Text>
      </View>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={event[0]?.eventParts || []}
        ListHeaderComponent={renderHeader}
        renderItem={renderClassItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },

  locationIcon: {
    fontSize: 30,
    color: "white",
    position: "absolute",
    top: -26,
    right: 0,
    padding: 10,
  },
  removeButton: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 1,
    marginLeft: 16,
    paddingBottom:10,
    color: "#6c757d",
  },
  card: {
    flex: 1,
    backgroundColor: "#365486",
    borderRadius:1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#ffffff",
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#ffffff",
  },
  userRole: {
    fontSize: 12,
    color: "#ffffff",
  },
  classItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  timelineContainer: {
    width: 30,
    alignItems: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#365486",
    marginBottom: 8,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#365486",
  },
  classContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  classHours: {
    marginRight: 8,
    alignItems: "flex-end",
  },
  startTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  endTime: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "white",
    marginBottom: 8,
  },
  studentListContainer: {
    marginRight: 10,
  },
  studentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -3,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default HomeEvent;
