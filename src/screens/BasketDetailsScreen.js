import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BasketDishItem from "../components/BasketDishItem";

const BasketDetails = () => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <BasketDishItem />
    </View>
  );
};

export default BasketDetails;

const styles = StyleSheet.create({});
