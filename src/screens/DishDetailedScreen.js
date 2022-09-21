import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Image } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddToBasket,
  handleAddMore,
} from "../redux/actions/BasketAction";
import { useNavigation } from "@react-navigation/native";

const DishDetailedScreen = () => {
  const userID = useSelector((state) => state.user.user._id);
  const basketItems = useSelector((state) => state.basket.basket);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [counter, setCounter] = useState(1);
  const { articulo, vendedor } = route.params;

  const onMinus = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const onPlus = () => {
    setCounter(counter + 1);
  };

  const onAddToBasket = async () => {
    //checkk if the item is already in the basket
    const item = basketItems.find((item) => item.id === articulo._id);
    if (item) {
      dispatch(
        handleAddMore({
          id: item.id,
          quantity: counter,
        })
      );
    } else if (
      basketItems[0]?.vendedor !== vendedor._id &&
      basketItems[0] !== undefined
    ) {
      alert("No puedes agregar productos de diferentes vendedores");
    } else {
      dispatch(
        handleAddToBasket({
          user: userID,
          id: articulo._id,
          vendedor: vendedor._id,
          name: articulo.nombre,
          price: articulo.precio,
          quantity: counter,
          imagen: articulo.imagen,
          descripcion: articulo.descripcion,
          stripeID: vendedor.stripeCustomerId,
        })
      );
    }
    navigation.navigate("Inicio");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Image
          alt="Articulo"
          source={{ uri: `data:image/gif;base64,${articulo?.imagen}` }}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1 * 0.8, bottom: 0 }}>
        <View style={styles.textContainer}>
          <Text style={styles.articuloText}>
            {articulo.nombre.toUpperCase()}
          </Text>
          <Text style={styles.vendedorText}>{vendedor.alias}</Text>
          <Text style={styles.priceText}>${articulo.precio}</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.descriptionText}>{articulo.descripcion}</Text>
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
      <TouchableOpacity style={styles.addButton} onPress={onAddToBasket}>
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
