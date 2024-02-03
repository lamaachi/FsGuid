// MapsScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GridButtonsScreen from './GridButtonsScreen';
import Map from './Map'
const Stack = createStackNavigator();

const MapsScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Grid'>
      <Stack.Screen name="Grid" screenOptions={{
            header: () => <CustomHeader title="FSJ GUID" navigation={navigation} />,
          }}
           options={{ headerShown: false }}  component={GridButtonsScreen} />
      <Stack.Screen name="Map"  component={Map} />
    </Stack.Navigator>
  );
};

export default MapsScreen;
