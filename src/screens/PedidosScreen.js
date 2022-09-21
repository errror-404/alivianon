import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BaseApiUrl, PedidosApiUrl } from "../api/BaseApiUrl";
import { FlatList, Spinner } from "native-base";
import { useSelector } from "react-redux";
import PedidoListItem from "../components/PedidoListItem";

const PedidosScreen = () => {
  const userID = useSelector((state) => state.user.user._id);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    PedidosApiUrl.get(`getPedidosByComprador${userID}`)
      .then((pedido) => {
        setPedidos(pedido.data);
      })
      .catch((err) => {
        console.log(err, "dd");
      });
  }, []);

  if (!pedidos) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size={"lg"}></Spinner>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => <PedidoListItem pedido={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default PedidosScreen;

const styles = StyleSheet.create({});
