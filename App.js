import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store/Store";
import MainNav from "./src/navigation/MainNav";
import { STRIPE_PK } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <NativeBaseProvider>
            <StripeProvider
              publishableKey={STRIPE_PK}
            >
              <MainNav />
            </StripeProvider>
            <StatusBar style="auto" />
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
