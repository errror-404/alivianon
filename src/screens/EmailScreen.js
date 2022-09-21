import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box, Button, Center, FormControl, Input } from "native-base";
import { BaseApiUrl } from "../api/BaseApiUrl";
import { useNavigation } from "@react-navigation/native";

const EmailScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    //validate email
    if (email === "") {
      alert("Ingrese un correo");
      return;
    }
    //validate email format
    if (!email.includes("@")) {
      alert("Ingrese un correo valido");
      return;
    }

    // send email to server
    BaseApiUrl.patch("forgotPassword", {
      email: email,
    })
      .then((response) => {
        if (response.data === "") {
          alert("No existe un usuario con ese correo");
          return;
        }
        // alert("Se ha enviado un correo con el código de verificación");
        navigation.navigate("CodeScreen", {
          email: email,
          code: response.data.code,
        });
      })
      .catch((error) => {
        console.log("Error al enviar el correo", error.message);
      })
      .finally(() => {
        setEmail("");
      });

    //redirect to code screen
  };

  return (
    <Center w="100%" bg={"#fff"} flex={1}>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <FormControl style={{ padding: 20 }}>
        <FormControl.Label>Correo electronico</FormControl.Label>
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.Input}
          value={email}
          placeholder="Ingresa tu correo electronico"
          onChangeText={(value) => setEmail(value)}
        />
      </FormControl>
      <Button onPress={onSubmit} width={"90%"}>
        Enviar
      </Button>
    </Center>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  Input: {
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
});
