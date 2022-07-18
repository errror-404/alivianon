import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Vendedores from "../data/vendedores.json";
import VendorDetailedHeader from "../components/VendorDetailedHeader";
import DishListItem from "../components/DishListItem";

const VendorsScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const vendor = Vendedores.find((vendor) => vendor.id === id);

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <VendorDetailedHeader restaurant={vendor} />}
        data={vendor.dishes}
        renderItem={({ item }) => (
          <DishListItem dish={item} vendedor={vendor.name} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default VendorsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  container: {
    margin: 10,
  },
});
