// GridButtonsScreen.js
import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { collection, getDocs } from "firebase/firestore";
import db from "../db/firebaseStore";
import { Card } from "react-native-elements";
import { batiment } from "../db/data";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { BottomNavigationTab } from "@ui-kitten/components";
import { FlatList, TextInput } from "react-native-gesture-handler";

const GridButtonsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(batiment);
  const [data, setData] = useState(batiment);

  useEffect(() => {
    // Filter data based on searchQuery
    const filtered = batiment.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  const handleButtonPress = (item) => {
    // Check if latitude and longitude are defined

    if (
      item.location.latitude !== undefined &&
      item.location.longitude !== undefined
    ) {
      //Navigate to the MapsScreen
      navigation.navigate("Map", {
        latitude: item.location.latitude,
        longitude: item.location.longitude, // 'longitude' is misspelled, should be 'longitude'
        title: item.name,
      });
    } else {
      // Display an alert for the case where latitude or longitude is undefined
      Alert.alert(
        "Invalid Coordinates",
        "Latitude or longitude is undefined for this location."
      );
    }
  };

  const renderItem = ({ item }) => (
   
      <TouchableOpacity onPress={() => handleButtonPress(item)}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {item.name}
            </Text>
            <View style={styles.cardRow}>
              <View style={styles.cardRowItem}>
                <FontAwesome5 color="#173153" name="building" size={13} />
                <Text style={styles.cardRowItemText}>{item.description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardAction}>
            <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
          </View>
        </View>
      </TouchableOpacity>
  );
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.containerheader}>
      <Text style={styles.header}>Don't get Lost </Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
    <FlatList
  data={filteredData}
  renderItem={renderItem}
  keyExtractor={(item) => item.name} // Assuming id is numeric, convert to string if necessary
  contentContainerStyle={styles.container}
/>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerheader: {
    padding: 16,
    paddingTop: 50,
    // backgroundColor: '#e8ecf4'
    backgroundColor: "white",
    position:"fixed"
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
  
  header:{
    color: '#6c757d',
    textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardAction: {

    marginTop: 18,
  },
  container: {
    padding: 24,
    
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  /** Card */
  card: {
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardWrapper: {
    paddingVertical: 16,
    borderTopWidth: 2,
    borderColor: "#e6e7e8",
  },
  cardImg: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 12,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    color: "#222",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: -6,
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#173153",
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 19,
    fontWeight: "700",
    color: "#173153",
  },
});

export default GridButtonsScreen;
