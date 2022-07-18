import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const BasketDishItem = () => {
  return (
    <View style={styles.row}>
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
        }}
        style={styles.image}
      />
      <View
        style={{
          flexDirection: "column",
          width: 220,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "600", color: "#475223" }}>
          Hamburger La Super Cabo Burger
        </Text>
        <Text style={styles.description}>
          Double meat, gouda cheese, cheddar cheese, cooked ham, bacon, egg,
          salad and rustic potatoes.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="pricetag-outline" size={20} color="green" />
          <Text style={{ color: "#E6C585", marginHorizontal: 5 }}>$8.99</Text>
          <Text style={{ color: "white" }}>cantidad: 3</Text>
        </View>
      </View>
      <TouchableOpacity>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default BasketDishItem;

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
  description: {
    color: "black",
    marginVertical: 5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});
