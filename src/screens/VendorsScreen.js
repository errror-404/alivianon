import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Vendedores from "../data/vendedores.json";
import VendorDetailedHeader from "../components/VendorDetailedHeader";
import DishListItem from "../components/DishListItem";
import { ArticulosApiUrl } from "../api/BaseApiUrl";
import { Spinner } from "native-base";

const VendorsScreen = () => {
  const [articulos, setArticulos] = useState(null);
  const route = useRoute();
  const { id, vendor } = route.params;

  useEffect(() => {
    ArticulosApiUrl.get(`getArticulosByVendedor${id}`).then((response) => {
      //articulos que no estan desactivados
      const articulos = response.data.filter((articulo) => {
        return articulo.activado === "true";
      });
      setArticulos(articulos);
    });
  }, [id]);

  if (!articulos) {
    return (
      <View style={styles.container}>
        <Spinner size={"lg"}></Spinner>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <VendorDetailedHeader restaurant={vendor} />}
        data={articulos}
        renderItem={({ item }) => (
          <DishListItem dish={item} vendedor={vendor} />
        )}
        keyExtractor={(item) => item._id}
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
