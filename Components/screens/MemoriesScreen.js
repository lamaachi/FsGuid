import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import db from "../db/firebaseStore";
import FontAwesome from "react-native-vector-icons/FontAwesome5";


export default function MemoriesScreen() {
    const [memories, setMemories] = useState([]);
    const [solid,setSolid] = useState(false)
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const memoriesCollection = collection(db, "memories");
        const memoriesSnapshot = await getDocs(memoriesCollection);
        const memoriesData = memoriesSnapshot.docs.map((doc) => doc.data());
        console.log(memoriesData[3].date)

        memoriesData.forEach((item)=>{
            item.date
        })
        setMemories(memoriesData);
      } catch (error) {
        console.error("Error fetching memories:", error);
      }
    };

    fetchMemories();
  }, []);

  const toggleSaveStatus = (index) => {
    const updatedMemories = [...memories];
    updatedMemories[index].saved = !updatedMemories[index].saved;
    setMemories(updatedMemories);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View >
      <Text style={styles.titlehead}>Last Events</Text>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
      
        {memories.map(({ date, name, image,saved,reviews,stars}, index) => {
          return (
            <View key={index}>
              <View style={styles.card}>
                <View style={styles.cardLikeWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleSaveStatus(index)
                    }}
                  >
                    <View style={styles.cardLike}>
                      <FontAwesome
                        color={saved ? "#ea266d" : "#222"}
                        name="heart"
                        solid={saved}
                        size={22}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardTop}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    style={styles.cardImg}
                    source={{ uri: image }}
                  />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{name}</Text>
                  </View>
                  <View>
                  <Text style={styles.cardPrice}>
                      <Text style={{ fontWeight: "400" }}>{date}</Text>
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <FontAwesome
                      color="#ea266d"
                      name="star"
                      solid={saved}
                      size={12}
                      style={{ marginBottom: 2 }}
                    />
                    
                    <Text style={styles.cardStars}>{stars}</Text>

                    <Text style={styles.cardReviews}>({reviews} reviews)</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 100,
    backgroundColor:"white",
  },
  titlehead:{
    textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:40,
    marginBottom: 16,
    color: '#6c757d'
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  /** Card */
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#232425",
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "400",
    color: "#232425",
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#232425",
  },
  cardReviews: {
    fontSize: 14,
    fontWeight: "400",
    color: "#595a63",
  },
});
