import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import HomeScreen from '../screens/HomeScreen';
import MapsScreen from '../screens/MapsScreen';
import MoreScreen from '../screens/MoreScreen';
import Map from '../screens/Map';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" icon={(props) => <Icon {...props} name="home-outline" pack="eva" />} />
    <BottomNavigationTab title="Maps" icon={(props) => <Icon {...props} name="map-outline" pack="eva" />} />
    <BottomNavigationTab title="More" icon={(props) => <Icon {...props} name="more-horizontal-outline" pack="eva" />} />
  </BottomNavigation>
);
const AppNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Maps" component={MapsScreen} />
    <Screen name="More" component={MoreScreen} />
    <Screen name="Map" component={Map} />
  </Navigator>
);

export default AppNavigator;
