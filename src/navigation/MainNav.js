import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNav from "./AuthStackNav";
import VendorsNav from "./DrawerNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainStack = createStackNavigator();




const MainNav = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={"auth"} component={AuthStackNav} />
      <MainStack.Screen name={"MainScreen"} component={VendorsNav} />
    </MainStack.Navigator>
  );
};

export default MainNav;
