import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, HStack, Input, VStack } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { PedidosApiUrl, StripeApiUrl } from "../api/BaseApiUrl";
import { crearPedido } from "../redux/actions/PedidoAction";
import { handleClearBasket } from "../redux/actions/BasketAction";
import { useStripe } from "@stripe/stripe-react-native";

const { width, height } = Dimensions.get("window");

const PaymentScreen = () => {
  const isFocused = useIsFocused();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [lastPedido, setLastPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const basketItems = useSelector((state) => state.basket.basket);
  const user = useSelector((state) => state.user.user);

  const [detalles, setDetalles] = useState("");
  const [metodo, setMetodo] = useState("Seleccionar metodo de pago");

  useEffect(() => {
    PedidosApiUrl.get(`/lastPedido${user._id}`).then((res) => {
      setLastPedido(res.data);
    });
  }, [isFocused]);
  // console.log(lastPedido);

  const getTotalPrice = () => {
    let total = 0;
    basketItems.map((item) => {
      total += item.price * item.quantity;
    });
    return {
      total: metodo === "Efectivo" ? total : total + total * 0.12,
      tarifaServicio: metodo === "Efectivo" ? total * 0 : total * 0.12,
    };
  };

  const handleMetodoPago = (metodo) => {
    setMetodo(metodo);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    if (lastPedido.estado === "NUEVO") {
      Alert.alert("No puedes realizar mas de un pedido a la vez");
      return;
    }
    if (getTotalPrice().total <= 10) {
      Alert.alert("El monto debe ser mayor a 10");
      return;
    }

    if (detalles.length === "" || detalles.length < 10) {
      Alert.alert("El detalle debe tener al menos 10 caracteres");
      return;
    }

    if (metodo === "Seleccionar metodo de pago") {
      Alert.alert("Seleccione un metodo de pago");
      return;
    }
    if (metodo === "Efectivo") {
      // await StripeApiUrl.post("/createCharge", {
      //   amount: getTotalPrice().total.toFixed(2) * 100 * 0.12,
      //   email: user.email,
      //   sellerId: basketItems[0].stripeID,
      // })
      //   .then((res) => {
      //     setIsLoading(false);
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      handlePedido();
    } else {
      const response = await StripeApiUrl.post("payment", {
        amount: getTotalPrice().total.toFixed(2) * 100,
        email: user.email,
        customerID: user.stripeCustomerId,
        VendorID: basketItems[0].stripeID,
      });

      if (response.status != 200) return console.log(response.data.message);

      const clientSecret = response.data.paymentIntent;

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        googlePay: true,
        merchantDisplayName: "Alivianon",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) {
        Alert.alert("El pago fue cancelado");
        console.log(presentSheet.error.message);
        setIsLoading(false);
      } else {
        Alert.alert("El pago fue exitoso, muchas gracias");
        handlePedido();
      }
    }
  };

  const handlePedido = async () => {
    const pedido = await PedidosApiUrl.post("/createPedido", {
      vendedorID: basketItems[0].vendedor,
      compradorID: user._id,
      articulos: basketItems,
      total: getTotalPrice().total.toFixed(2),
      detalles: detalles,
    });

    dispatch(await crearPedido(pedido.data));
    dispatch(await handleClearBasket());
    setIsLoading(false);
    navigation.navigate("Entrega", { pedido: pedido.data });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, alignItems: "center", height: "100%" }}
    >
      <View style={styles.DireccionContainer}>
        <Text style={styles.direccionText}>
          Detalles de entrega/Salon de entrega
        </Text>
        <Input
          placeholder="Entregar el pedido en el salon..."
          style={styles.direccionInput}
          onChangeText={(text) => setDetalles(text)}
        />
      </View>
      <TouchableOpacity
        style={{ ...styles.DireccionContainer, height: 100 }}
        onPress={() =>
          navigation.navigate("MetodosPago", {
            handleMetodoPago,
            total: getTotalPrice().total,
          })
        }
      >
        <Text style={styles.direccionText}> metodo de pago</Text>
        <Text
          style={{
            ...styles.direccionText,
            color: "#000",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {metodo !== "Seleccionar metodo de pago"
            ? metodo
            : "Seleccionar metodo de pago"}
        </Text>
      </TouchableOpacity>
      <View style={styles.DireccionContainer}>
        <Text style={styles.direccionText}>Resumen de pedido</Text>
        <Divider />

        {basketItems.map((item) => (
          <HStack key={item.id}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.articuloText}>
                {item.name} x {item.quantity}
              </Text>
              <Text style={styles.articuloText}>${item.price}</Text>
            </View>
          </HStack>
        ))}

        <HStack>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.articuloText}>Tarifa de servicio</Text>
            <Text style={styles.articuloText}>
              ${getTotalPrice().tarifaServicio.toFixed(2)}
            </Text>
          </View>
        </HStack>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handlePayment()}>
        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
          {isLoading
            ? "Cargando..."
            : `Pagar $ ${getTotalPrice().total.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    height: height * 0.05,
    fontSize: 16,
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
