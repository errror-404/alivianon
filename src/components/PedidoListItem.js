import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import Moment from "react-moment";
import { VendedoresApiUrl } from "../api/BaseApiUrl";
import "moment/locale/es";
const PedidoListItem = ({ pedido }) => {
  const navigation = useNavigation();
  const [vendedor, setVendedor] = useState(null);

  useEffect(() => {
    VendedoresApiUrl.get(`getVendedorByID${pedido.vendedorID}`).then(
      (vendedor) => {
        setVendedor(vendedor.data);
      }
    );
  }, []);

  const onPress = () => {
    navigation.navigate("PedidoInd", { pedido: pedido, vendedor: vendedor });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
      }}
    >
      <Image
        source={{ uri: `data:image/gif;base64,${vendedor?.imagen}` }}
        style={{
          width: 75,
          height: 75,
          marginRight: 5,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "black" }}>
          {vendedor?.alias}
        </Text>
        <Text style={{ marginVertical: 5, color: "black" }}>
          Total &#8226; ${pedido?.total.toFixed(2)}
        </Text>

        <Text style={{ color: "black" }}>
          {pedido.estado} &#8226;{" "}
          <Moment locale="es" element={Text} fromNow style={{ color: "black" }}>
            {pedido.fecha}
          </Moment>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PedidoListItem;
