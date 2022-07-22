import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const DeliveryScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
