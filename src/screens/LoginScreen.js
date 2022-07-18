import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { BaseApiUrl } from "../api/BaseApiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  //hook para navegar entre ventanas
  const navigation = useNavigation();

  //state para mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  //states donde almacenaremos correo y contraseña
  const [authCredentials, setAuthCredentials] = useState({
    email: "",
    password: "",
  });

  //funcion para obtener los valores de los inputs
  const handleInputChange = (value, name) => {
    setAuthCredentials({
      ...authCredentials,
      [name]: value,
    });
  };

  //funcion para enviar los datos al servidor
  const handleSubmit = async () => {
    //enviar los datos al servidor
    //validacion de ingreso de datos
    if (authCredentials.email === "" && authCredentials.password === "") {
      setErrorMessage("Ingrese un correo y contraseña");
      return;
    }

    await BaseApiUrl.post("login", {
      email: authCredentials.email,
      password: authCredentials.password,
    })
      .then((response) => {
        console.log(response);
        if (response.data === "") {
          setErrorMessage("Usuario o contraseña incorrectos");
        } else {
          AsyncStorage.setItem("loggedIn", "true");
          navigation.navigate("MainScreen");
        }
      })
      .catch((error) => {
        console.log(error, " error");
      });

    // navigation.navigate("MainScreen");

    //redireccionar a la pantalla principal
    //si no, mostrar un mensaje de error
  };

  //Revisar si el usuario esta autenticado
  useEffect(() => {
    AsyncStorage.getItem("loggedIn").then((value) => {
      console.log(value);
      if (value === "true") {
        navigation.navigate("MainScreen");
      }
    });
  }, []);

  return (
    <Center w="100%" bg={"#fff"} flex={1}>
      <Box safeArea p="3" w="100%" maxW="390">
        {/* <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bienvenido
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Inicia sesión para continuar!
        </Heading> */}

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Correo electronico</FormControl.Label>
            <Input
              type="text"
              onChangeText={(value) => handleInputChange(value, "email")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) => handleInputChange(value, "password")}
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </FormControl>
          <Text marginY={2} textAlign={"center"} color="red.600">
            {errorMessage}
          </Text>
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Iniciar sesión
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Soy un usuario nuevo.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("SignUp")}
            >
              Registrarme
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
