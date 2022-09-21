import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const height = Dimensions.get("window").height;

const PaymentMethods = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { total } = route.params;

  const handleMetodoPago = (metodoPago) => {
    route.params.handleMetodoPago(metodoPago);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <Text style={styles.title}>Tus metodos de pago</Text>
      <Text style={{ fontSize: 22, marginVertical: 10, color: "#000" }}>
        Total a pagar
      </Text>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#E6C585" }}>
        {total}
      </Text>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Metodos de pago
          </Text>
        </View>

        <ScrollView>
          <TouchableOpacity onPress={() => handleMetodoPago("Efectivo")}>
            <View
              style={{
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: "#ED1C25",
              }}
            >
              <Text style={{ color: "white", padding: 15, fontSize: 18 }}>
                Efectivo
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => handleMetodoPago("Tarjeta de credito/debito")}
          >
            <View
              style={{
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: "#ED1C25",
              }}
            >
              <Text style={{ color: "white", padding: 15, fontSize: 18 }}>
                Tarjeta de credito/debito
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  title: {
    fontSize: 25,

    color: "black",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    marginVertical: 40,
    marginHorizontal: 20,
    borderRadius: 20,
    height: height * 0.6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
