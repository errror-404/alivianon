import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import MainNav from "./src/navigation/MainNav";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MainNav />
        <StatusBar style="dark" />
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
