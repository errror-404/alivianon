import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  View,
} from "react-native";
import React from "react";
import { StripeApiUrl } from "../api/BaseApiUrl";
import { useStripe } from "@stripe/stripe-react-native";
import { Button, FormControl, Input, Modal } from "native-base";
import { useSelector } from "react-redux";

const DonateButton = () => {
  const user = useSelector((state) => state.user.user);
  // console.log(user.email);
  const stripe = useStripe();
  const [amount, setAmount] = React.useState("30");
  const [showModal, setShowModal] = React.useState(false);

  const handlePayment = async () => {
    if (amount <= 10) {
      Alert.alert("El monto debe ser mayor a 10");
      return;
    }
    const response = await StripeApiUrl.post("donation", {
      amount: parseInt(amount) * 100,
      email: user.email,
      customerID: user.stripeCustomerId,
    });
    // console.log(response.data);

    if (response.status != 200) return console.log(response.data.message);

    const clientSecret = response.data.paymentIntent;

    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      // googlePay: true,
      merchantDisplayName: "Alivianon",
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) {
      Alert.alert("El pago fue cancelado");
      console.log(presentSheet.error.message);
    } else {
      Alert.alert("El pago fue exitoso, muchas gracias");
      setShowModal(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowModal(!showModal)}
      >
        <Text style={styles.text}>Apoyar con el proyecto</Text>
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Apoyanos con una donación!</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Cantidad a donar</FormControl.Label>
              <Input
                value={amount}
                onChangeText={(text) => setAmount(text)}
                type="text"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button onPress={handlePayment}>Donar</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default DonateButton;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ED1C25",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
