import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BasketDishItem from "../components/BasketDishItem";
import { useSelector } from "react-redux";
import { FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";

const BasketDetails = () => {
  const navigation = useNavigation();
  const basketItems = useSelector((state) => state.basket.basket);

  const handleCheckOut = () => {
    if (basketItems.length > 0) {
      navigation.navigate("Pagar");
    } else {
      alert("No hay articulos en el carrito");
    }
  };

  return (
    <View style={{ marginHorizontal: 10, flex: 1 }}>
      <FlatList
        data={basketItems}
        renderItem={({ item }) => <BasketDishItem dish={item} />}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={{
          flex: 0,
          bottom: 10,
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: "#ED1C25",
        }}
        onPress={handleCheckOut}
      >
        <Text
          style={{
            fontWeight: "600",
            color: "#ffffff",
            padding: 10,
          }}
        >
          {basketItems.length > 0
            ? "Proceder a pagar"
            : "No hay productos en el carrito"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketDetails;

const styles = StyleSheet.create({});
