import React, { useState } from "react";
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

const SignUpScreen = () => {
  //hook para navegar entre ventanas
  const navigation = useNavigation();

  //state para mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  //state para manejar datos de registro
  const [authCredentials, setAuthCredentials] = useState({
    correo: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellidos: "",
    telefono: "",
  });

  //funcion para obtener los valores de los inputs
  const handleInputChange = (value, name) => {
    setErrorMessage("");
    setAuthCredentials({
      ...authCredentials,
      [name]: value,
    });
  };

  //funcion para enviar los datos al servidor
  const handleSubmit = async () => {
    //enviar los datos al servidor

    //validacion de ingreso de datos
    if (authCredentials.correo === "" && authCredentials.password === "") {
      setErrorMessage("Ingrese un correo y contraseña");
      return;
    }

    //validar correo electronico
    if (authCredentials.correo.indexOf("@") === -1) {
      setErrorMessage("Ingrese un correo electronico valido");
      return;
    }

    //validar que las contraseñas sean iguales
    if (
      authCredentials.password !== authCredentials.confirmPassword ||
      authCredentials.password === ""
    ) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    await BaseApiUrl.post("createUser", {
      email: authCredentials.correo,
      password: authCredentials.password,
      name: authCredentials.nombre,
      lastName: authCredentials.apellidos,
      phoneNumber: authCredentials.telefono,
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          setErrorMessage(response.data.message);
        } else {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error, " errorll");
      });

    // console.log(authCredentials);
  };

  return (
    <Center w="100%" bg={"#fff"} flex={1}>
      <Box safeArea p="1" w="90%" maxW="390">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Bienvenido
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Registrate para continuar!
        </Heading>
        <VStack space={2} mb="8" mt={"3"}>
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input
              onChangeText={(value) => handleInputChange(value, "nombre")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Apellidos</FormControl.Label>
            <Input
              onChangeText={(value) => handleInputChange(value, "apellidos")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Correo electronico</FormControl.Label>
            <Input
              onChangeText={(value) => handleInputChange(value, "correo")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Telefono</FormControl.Label>
            <Input
              onChangeText={(value) => handleInputChange(value, "telefono")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) => handleInputChange(value, "password")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirmar Contraseña</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) =>
                handleInputChange(value, "confirmPassword")
              }
            />
          </FormControl>
          <Text marginY={2} textAlign={"center"} color="red.600">
            {errorMessage}
          </Text>
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Registrarse
          </Button>

          <HStack justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Ya tienes una cuenta?{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Inicia sesión
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUpScreen;
