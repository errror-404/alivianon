import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./src/navigation/DrawerNav";
import "react-native-gesture-handler";
import MainNav from "./src/navigation/MainNav";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <LoginScreen /> */}
        {/* <SignUpScreen /> */}
        <MainNav />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
