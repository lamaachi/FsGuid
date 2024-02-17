import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import MapsScreen from "../screens/MapsScreen";
import MoreScreen from "../screens/MoreScreen";
import HomeScreen from "../screens/HomeScereen";
import MemoriesScreen from "../screens/MemoriesScreen";
import Map from "../screens/Map";
import comments from "../screens/Comments/comments";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Home"
      icon={(props) => <Icon {...props} name="home-outline" pack="eva" />}
    />
    <BottomNavigationTab
      title="Maps"
      icon={(props) => <Icon {...props} name="map-outline" pack="eva" />}
    />
    <BottomNavigationTab
      title="Comments"
      icon={(props) => (
        <Icon {...props} name="message-square-outline" pack="eva" />
      )}
    />
    <BottomNavigationTab
      title="Memories"
      icon={(props) => <Icon {...props} name="camera-outline" pack="eva" />}
    />
    <BottomNavigationTab
      title="More"
      icon={(props) => (
        <Icon {...props} name="more-horizontal-outline" pack="eva" />
      )}
    />
  </BottomNavigation>
);
const AppNavigator = () => {
  return (
    <Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    > 
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Maps" component={MapsScreen} />
      <Screen name="Comments" component={comments} />
      <Screen name="Memories" component={MemoriesScreen} />
      <Screen name="More" component={MoreScreen} />
      <Screen name="Map" component={Map} />
    </Navigator>
  );
};

export default AppNavigator;
