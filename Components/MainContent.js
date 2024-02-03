// MainContent.js
import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {  StyleSheet } from "react-native";
import {  Provider as PaperProvider } from 'react-native-paper';
import DefaultTheme from "@react-navigation/native";
import AppNavigator from "./navigation/Navigation";
import { BackHandler } from "react-native";

const MainContent = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true; // Prevent default behavior (exit the app)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Remove the event listener when the component is unfocused
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
  const theme = {
    ...DefaultTheme, // You can customize the theme by merging with DefaultTheme
    // Additional customizations if needed
  };
  return (
    <PaperProvider theme={theme}>
      {/* <NavigationContainer> */}
        <AppNavigator />
      {/* </NavigationContainer> */}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
});

export default MainContent;
