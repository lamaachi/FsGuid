import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../db/firebaseStore";

const MoreScreen = ({ navigation }) => {
  const [userRole, setUserRole] = useState("");
  const [email, setUserEmail] = useState("");
  const wifiInfo = {networkName:"Compus Connecte",password:"Youre ucd pasword",networkEmail:"Youre ucd email"}
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const  role  = await fetchUserRole(user.email);
        setUserRole(role);
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //fetch user Role
  const fetchUserRole = async (userEmail) => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(
        usersCollection,
        where("email", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      let role = "";
      let email = "";
      querySnapshot.forEach((doc) => {
        role = doc.data().role;
        email = doc.data().email;
      });
      return role;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Image
                alt=""
                source={require("../../assets/non.jpg")}
                style={styles.avatarImg}
              />

              <View style={styles.avatarNotification} />
            </View>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>{email.split("@")[0]}</Text>
              <Text style={styles.profileSubtitle}>
                {userRole}

                {" · "}

                <Text style={{ color: "#266EF1" }}>FSJ</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <Card containerStyle={styles.card}>
            <Card.Title>Wi-Fi Access Information</Card.Title>
            <Card.Divider />
            <Text>Network Name: {wifiInfo.networkName}</Text>
            <Text>Email: {wifiInfo.networkEmail}</Text>
            <Text>Password: {wifiInfo.password}</Text>
        </Card>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    color: "white",
  },
  card: {
    marginBottom: 20,
  },
  /** Profile */
  profile: {
    backgroundColor: "#fff",
    padding: 24,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  logoutButton: {
    backgroundColor: "#266EF1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#121a26",
    marginBottom: 6,
    marginTop: 13,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#778599",
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  profileTags: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#266ef1",
    marginRight: 4,
  },
  /** Avatar */
  avatar: {
    position: "relative",
  },
  avatarImg: {
    marginTop:18,
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: "#22C55E",
  },
});

export default MoreScreen;
