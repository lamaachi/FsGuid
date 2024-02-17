import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = "AIzaSyBa6wKAcoJEA5h_gzJBuIqU6UNKc1sXbQk";

export default function Map() {
  const route = useRoute();
  const [userLocation, setUserLocation] = useState(null);
  const latitude = route.params?.latitude;
  const longitude = route.params?.longitude;
  const title = route.params?.title || "Event Location";
  
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });


      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      });
    };

    fetchUserLocation();
  }, []);

  const onPresMarker=()=>{
    console.log("Marker Pressed")
  }

  return (
    <View style={styles.container}>
      <MapView
        minZoomLevel={17}
        maxZoomLevel={20}
        mapType="hybrid"
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        pitchEnabled={true} // Enable 3D effect
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true} // Optionally, set this to true if you want the map to follow the user's location
      > 
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={title}
          description={"FSJ " + title}
          onPress={onPresMarker}
        />
        {userLocation && (
          <MapViewDirections
            origin={userLocation} // Use live user location as the origin
            destination={{
              latitude: latitude,
              longitude: longitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={7}
            strokeColor="green"
            mode="WALKING"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
