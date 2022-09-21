import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Center, FormControl, Input } from "native-base";
import { BaseApiUrl } from "../api/BaseApiUrl";

const NewPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params.email;

  const HandleSubmit = async () => {
    if (password === "" || passwordConfirm === "") {
      alert("Favor de ingresar todos los campos");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    await BaseApiUrl.patch("newPassword", {
      email: email,
      password: password,
    });
    alert("Contraseña actualizada correctamente");
    navigation.navigate("Login");
  };

  return (
    <Center w="100%" bg={"#fff"} flex={1}>
      <Text style={styles.title}>Ingresa tu nueva contraseña</Text>
      <FormControl style={{ padding: 20 }}>
        <FormControl.Label>Nueva contraseña</FormControl.Label>
        <Input
          style={styles.Input}
          type={"password"}
          value={password}
          placeholder="Ingresa tu nueva electronico"
          onChangeText={(value) => setPassword(value)}
        />
      </FormControl>
      <FormControl style={{ padding: 20 }}>
        <FormControl.Label>Confirmar contraseña</FormControl.Label>
        <Input
          style={styles.Input}
          type={"password"}
          value={passwordConfirm}
          placeholder="Ingresa de nuevo tu nueva contraseña"
          onChangeText={(value) => setPasswordConfirm(value)}
        />
      </FormControl>
      <Button onPress={HandleSubmit} width={"90%"}>
        Enviar
      </Button>
    </Center>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({});
