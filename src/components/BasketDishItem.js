import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { handleRemoveFromBasket } from "../redux/actions/BasketAction";
import { useDispatch } from "react-redux";

const BasketDishItem = ({ dish, isOrder }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(handleRemoveFromBasket(dish));
  };

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: `data:image/gif;base64,${dish.imagen}` }}
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
          {dish?.name.toUpperCase()}
        </Text>
        <Text style={styles.description}>{dish?.descripcion}</Text>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="pricetag-outline" size={20} color="green" />
          <Text style={{ color: "#E6C585", marginHorizontal: 5 }}>
            ${dish?.price}
          </Text>
          <Text style={{ color: "black" }}>cantidad: {dish?.quantity}</Text>
        </View>
      </View>
      {isOrder ? null : (
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      )}
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
