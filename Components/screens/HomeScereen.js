// MapsScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GridButtonsScreen from './GridButtonsScreen';
import Map from './Map'
import HomeEvent from './HomeEvent';
const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName='HomeEvent'>
      <Stack.Screen name="HomeEvent" screenOptions={{
            header: () => <CustomHeader title="FSJ GUID" navigation={navigation} />,
          }}
           options={{ headerShown: false }}  component={HomeEvent} />
      <Stack.Screen name="Map"  component={Map} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
