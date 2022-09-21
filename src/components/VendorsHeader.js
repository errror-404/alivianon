import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { Image, Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

const CarouselCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require("../images/carrousel-image-1.png")}
        style={styles.image}
        alt="carrousel-image-1"
      />
    </View>
  );
};

const VendorsHeader = ({ pedido }) => {
  const navigation = useNavigation();

  const window = Dimensions.get("window").width;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
    >
      {pedido.estado === "NUEVO" || pedido.estado === "EN_CAMINO" ? (
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            flex: 1,
            width: "100%",
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate("Entrega", {
              pedido: pedido,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 17, textAlign: "center" }}>
              Tienes un pedido activo
            </Text>
            <Spinner size={"lg"}></Spinner>
          </View>
        </TouchableOpacity>
      ) : null}

      <Carousel
        autoPlay={true}
        autoPlayInterval={6000}
        loop={true}
        itemWidth={window}
        itemHeight={window * 0.5}
        sliderWidth={window}
        sliderHeight={window * 0.5}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={window * 0.95}
        height={150}
        data={[1, 2, 3]}
        renderItem={({ item }) => <CarouselCard item={item} />}
      />
    </View>
  );
};

export default VendorsHeader;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
