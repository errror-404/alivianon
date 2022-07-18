import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import vendedores from "../data/vendedores.json";
import { useRoute } from "@react-navigation/native";
import { Image } from "native-base";

const DishDetailedScreen = () => {
  const route = useRoute();
  const { articulo, vendedor } = route.params;

  const [counter, setCounter] = useState(1);

  const onMinus = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const onPlus = () => {
    setCounter(counter + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Image alt="" source={{ uri: articulo.image }} style={styles.image} />
      </View>
      <View style={{ flex: 1 * 0.8, bottom: 0 }}>
        <View style={styles.textContainer}>
          <Text style={styles.articuloText}>{articulo.name}</Text>
          <Text style={styles.vendedorText}>{vendedor}</Text>
          <Text style={styles.priceText}>${articulo.price}</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.descriptionText}>{articulo.description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          top: "12%",
        }}
      >
        <TouchableOpacity style={styles.Counterbutton} onPress={onMinus}>
          <Text
            style={{ fontSize: 22, textAlign: "center", fontWeight: "400" }}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{counter}</Text>
        <TouchableOpacity style={styles.Counterbutton} onPress={onPlus}>
          <Text
            style={{ fontSize: 22, textAlign: "center", fontWeight: "400" }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          Agregar al carrito
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DishDetailedScreen;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    aspectRatio: 5 / 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    position: "relative",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    top: "50%",
    backgroundColor: "white",
    width: "90%",
    height: 200,
    marginHorizontal: 20,
    borderRadius: 20,
    //bottom Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    //end bottom shadow
  },
  articuloText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  vendedorText: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  Counterbutton: {
    width: 35,
    height: 35,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  quantityText: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  addButton: {
    top: "12%",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED1C25",
  },
});
