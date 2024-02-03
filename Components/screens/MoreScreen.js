import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Card, Avatar, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../CustomButton";
import { getAuth, signOut } from "firebase/auth";

const MoreScreen = ({ navigation }) => {
  const [user, setUser] = useState("null");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userToken");
        if (userEmail) {
          setUser({ email: userEmail });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      const auth = getAuth();
      await signOut(auth);
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
        <CustomButton onPress={handleLogout} title="Logout" />
        </View>
      </View>

      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>Developer Information</Card.Title>
        <Card.Divider />
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="large"
            source={require("../../assets/avatar.png")} // Replace with the actual path to your avatar
          />
        </View>
        <Text style={styles.text}>Lamaachi Youssef</Text>
        <Text style={styles.text}>Lamaachi.y889@ucd.ac.ma</Text>
        <View style={styles.iconContainer}>
          <Icon
            name="github"
            type="font-awesome"
            size={30}
            onPress={() => console.log("GitHub icon pressed")}
          />
          <Icon
            name="linkedin-square"
            type="font-awesome"
            size={30}
            onPress={() => console.log("LinkedIn icon pressed")}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    backgroundColor: "#e8ecf4",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    flex: 1,
    marginRight: 10,
  },
  cardContainer: {
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default MoreScreen;
