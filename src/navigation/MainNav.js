import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNav from "./AuthStackNav";

const MainStack = createStackNavigator();

const MainNav = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={"auth"} component={AuthStackNav} />
    </MainStack.Navigator>
  );
};

export default MainNav;
