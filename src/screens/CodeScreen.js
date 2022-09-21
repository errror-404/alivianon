import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Center, FormControl, HStack, Input } from "native-base";

const CodeScreen = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  //get code from params
  const route = useRoute();
  const navigation = useNavigation();
  const code = route.params.code;
  const email = route.params.email;

  const codeVerify = () => {
    if (code1 === "" || code2 === "" || code3 === "" || code4 === "") {
      alert("Favor de ingresar todos los campos");
      return;
    }
    if (code1 + code2 + code3 + code4 !== code.toString()) {
      alert("Código incorrecto");
      return;
    }
    // alert("Código correcto");
    navigation.navigate("NewPasswordScreen", {
      email: email,
    });
  };

  return (
    <Center w="100%" bg={"#fff"} flex={1}>
      <Text style={styles.title}>Ingresa tu código de verificación</Text>
      <FormControl>
        <HStack justifyContent={"center"} space={4}>
          <Input
            keyboardType="numeric"
            style={styles.Input}
            width={50}
            maxLength={1}
            value={code1}
            placeholder="0"
            onChangeText={(value) => setCode1(value)}
          />
          <Input
            keyboardType="numeric"
            style={styles.Input}
            width={50}
            maxLength={1}
            value={code2}
            placeholder="0"
            onChangeText={(value) => setCode2(value)}
          />
          <Input
            keyboardType="numeric"
            style={styles.Input}
            width={50}
            maxLength={1}
            value={code3}
            placeholder="0"
            onChangeText={(value) => setCode3(value)}
          />
          <Input
            keyboardType="numeric"
            style={styles.Input}
            width={50}
            maxLength={1}
            value={code4}
            placeholder="0"
            onChangeText={(value) => setCode4(value)}
          />
        </HStack>
      </FormControl>
      <Button width={"90%"} marginTop={10} onPress={codeVerify}>
        Verificar
      </Button>
    </Center>
  );
};

export default CodeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  Input: {
    width: 100,
    fontSize: 16,
    textAlign: "center",
  },
});
