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
  Select,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { BaseApiUrl } from "../api/BaseApiUrl";
import Escuelas from "../data/escuelas";

const SignUpScreen = () => {
  //hook para navegar entre ventanas
  const navigation = useNavigation();

  //state para mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //state para manejar datos de registro
  const [authCredentials, setAuthCredentials] = useState({
    correo: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    escuela: "",
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
    setIsLoading(true);
    //enviar los datos al servidor

    //validacion de ingreso de datos
    if (authCredentials.correo === "" && authCredentials.password === "") {
      setErrorMessage("Ingrese un correo y contraseña");
      setIsLoading(false);

      return;
    }

    //validar correo electronico
    if (authCredentials.correo.indexOf("@") === -1) {
      setErrorMessage("Ingrese un correo electronico valido");
      setIsLoading(false);

      return;
    }

    //validar que las contraseñas sean iguales
    if (
      authCredentials.password !== authCredentials.confirmPassword ||
      authCredentials.password === ""
    ) {
      setErrorMessage("Las contraseñas no coinciden");
      setIsLoading(false);

      return;
    }

    await BaseApiUrl.post("createUser", {
      email: authCredentials.correo,
      password: authCredentials.password,
      name: authCredentials.nombre,
      lastName: authCredentials.apellidos,
      phoneNumber: authCredentials.telefono,
      escuela: authCredentials.escuela,
    })
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.message);
        } else {
          setIsLoading(false);
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        alert("Ya existe una cuenta con ese correo");

        setIsLoading(false);
      });
  };

  useEffect(() => {
    Escuelas.sort((a, b) => {
      if (a.universidad_nombre < b.universidad_nombre) {
        return -1;
      }
      if (a.universidad_nombre > b.universidad_nombre) {
        return 1;
      }
      return 0;
    });
  }, [Escuelas]);

  return (
    <ScrollView>
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
          <VStack space={2} mb="10" mt={"1"}>
            <FormControl isRequired>
              <FormControl.Label>Nombre</FormControl.Label>
              <Input
                onChangeText={(value) => handleInputChange(value, "nombre")}
              />
              <FormControl.ErrorMessage>
                Try different from previous passwords.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Apellidos</FormControl.Label>
              <Input
                onChangeText={(value) => handleInputChange(value, "apellidos")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Correo electronico</FormControl.Label>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => handleInputChange(value, "correo")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Selecciona tu escuela</FormControl.Label>
              <Select
                onValueChange={(value) => handleInputChange(value, "escuela")}
              >
                {Escuelas.map((escuela) => (
                  <Select.Item
                    key={escuela.universidad_id}
                    label={escuela.universidad_nombre}
                    value={escuela.universidad_nombre}
                  />
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Telefono</FormControl.Label>
              <Input
                onChangeText={(value) => handleInputChange(value, "telefono")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => handleInputChange(value, "password")}
              />
            </FormControl>
            <FormControl isRequired>
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
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrar"}
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
    </ScrollView>
  );
};

export default SignUpScreen;
