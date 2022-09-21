import {
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Image, Text } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PedidosApiUrl } from "../api/BaseApiUrl";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const pedido = route.params.pedido;
  const [estado, setEstado] = useState(pedido.estado);

  const orderStatus = {
    NUEVO: "Tu pedido fue creado",
    EN_CAMINO: "Tu pedido está en camino",
    COMPLETADO: "Tu pedido ha sido completado",
  };

  const handleEstado = () => {
    const timer = setInterval(() => {
      PedidosApiUrl.get(`/getPedidoById${pedido._id}`).then((response) => {
        if (response.data.estado === "EN_CAMINO") {
          return setEstado("EN_CAMINO");
        } else if (estado === "COMPLETADO") {
          navigation.navigate("Inicio");
          clearInterval(timer);
        } else {
          setEstado(response.data.estado);
        }
      });
    }, 5000);
  };

  useEffect(() => {
    handleEstado();
  }, []);

  return (
    <View style={{ top: insets.top, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          margin: 20,
          padding: 10,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Entrega estimada</Text>
        <Text>15 min</Text>
      </View>
      <Text
        style={{
          fontSize: 30,
          color: "black",
          padding: 30,
          marginTop: 30,
        }}
      >
        {orderStatus[estado]}
      </Text>
      <Text style={{ marginHorizontal: 20 }}>
        Costo final del pedido: ${pedido.total.toFixed(2)}
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{
            uri: "https://media4.giphy.com/media/xT0xeOGAGEAuQK1ujm/giphy.gif?cid=ecf05e47vjr6nrphw6ivps6qj8maeopl0plfwqz560kv3byf&rid=giphy.gif&ct=g",
          }}
          style={{ width: 400, height: 400, alignSelf: "center" }}
          alt="Loading"
        />
        <TouchableOpacity
          style={{
            margin: 10,
            marginLeft: 20,
            backgroundColor: "#ED1C25",
            padding: 10,
            width: 200,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            bottom: 60,
          }}
          onPress={() => navigation.navigate("Inicio")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryScreen;
