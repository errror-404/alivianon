import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Divider, HStack, Input } from "native-base";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const PaymentScreen = () => {
  const navigation = useNavigation();

  const handlePagar = () => {
    navigation.navigate("Entrega");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", height: "100%" }}>
      <View style={styles.DireccionContainer}>
        <Text style={styles.direccionText}>Detalles de entrega</Text>
        <Input
          placeholder="Entregar el pedido en el salon..."
          style={styles.direccionInput}
        />
      </View>
      <View style={styles.DireccionContainer}>
        <Text style={styles.direccionText}>Resumen de pedido</Text>
        <Divider />
        <HStack space={10}>
          <Text style={styles.articuloText}>articulo #1</Text>
          <Text style={styles.articuloText}>$90.00</Text>
        </HStack>
      </View>
      <Button style={styles.button} onPress={() => handlePagar()}>
        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
          Pagar
        </Text>
      </Button>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  DireccionContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    height: height * 0.2,
    padding: 10,
    borderRadius: 10,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 10,
    },
    elevation: 8,
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  direccionText: {
    color: "#6A8438",
    fontSize: 20,
    fontWeight: "bold",
  },
  direccionInput: {
    borderRadius: 5,
  },
  articuloText: {
    fontSize: 16,
  },

  button: {
    //bottom of screen
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: height * 0.1,
    fontSize: 20,
    width: width * 0.9,
    height: height * 0.1,
    borderRadius: 10,
    backgroundColor: "#ED1C25",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 10,
    },
    elevation: 8,
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
});
