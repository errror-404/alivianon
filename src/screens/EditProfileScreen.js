import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  HStack,
  Input,
  Select,
  VStack,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { BaseApiUrl } from "../api/BaseApiUrl";
import Escuelas from "../data/escuelas";
import { useNavigation } from "@react-navigation/native";
import { handleUpdateUser } from "../redux/actions/AuthAction";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    id: user._id,
    nombre: user.name,
    apellido: user.lastName,
    correo: user.email,
    // password: user.password,
    telefono: user.phoneNumber,
    escuela: user.escuela,
  });

  /**
   * Maneja el cambio de los valores del objeto newUser
   * @author Alan Rodriguez
   * @param {string} type - nombre de campo a actualizar
   * @param {string} value - valor del campo a actualizar
   * @return {void} Nothing
   *
   */

  const handleOnChange = (type, value) => {
    setNewUser({ ...newUser, [type]: value });
  };

  /**
   * Actualiza el usuario en la base de datos
   * @author Alan Rodriguez
   * @return {void} Nothing
   *
   * @see {@link BaseApiUrl}
   */

  const handleUpdate = () => {
    BaseApiUrl.patch(`/editUser${user._id}`, {
      name: newUser.nombre,
      lastName: newUser.apellido,
      email: newUser.correo,
      // password: newUser.password,
      phoneNumber: newUser.telefono,
      escuela: newUser.escuela,
      role: "user",
    })
      .then(async (res) => {
        dispatch(await handleUpdateUser(res.data._doc));
        setNewUser({
          nombre: "",
          apellido: "",
          correo: "",
          // password: "",
          telefono: "",
          escuela: "",
        });
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
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
    <>
      <VStack padding={5} flex={1} bgColor={"white"}>
        <FormControl>
          <FormControl.Label>Nombre</FormControl.Label>
          <Input
            placeholder={user.name}
            style={styles.inputContainer}
            onChangeText={(value) => handleOnChange("nombre", value)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellidos</FormControl.Label>
          <Input
            placeholder={user.lastName}
            style={styles.inputContainer}
            onChangeText={(value) => handleOnChange("apellido", value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Selecciona tu escuela</FormControl.Label>
          <Select
            style={styles.inputContainer}
            placeholder={user.escuela}
            onValueChange={(value) => handleOnChange("escuela", value)}
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
        <FormControl>
          <FormControl.Label>Correo</FormControl.Label>
          <Input
            placeholder={user.email}
            style={styles.inputContainer}
            isDisabled
            onChangeText={(value) => handleOnChange("correo", value)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Telefono</FormControl.Label>
          <Input
            placeholder={user.phoneNumber}
            style={styles.inputContainer}
            onChangeText={(value) => handleOnChange("telefono", value)}
          />
        </FormControl>
        {/* <FormControl>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Input
            type="password"
            placeholder={"********"}
            style={styles.inputContainer}
            onChangeText={(value) => handleOnChange("password", value)}
          />
        </FormControl> */}

        <HStack justifyContent={"space-around"}>
          <Button style={{ marginTop: 20, width: 120 }} onPress={handleUpdate}>
            Guardar
          </Button>
          <Button
            style={{ marginTop: 20, width: 120, backgroundColor: "tomato" }}
            onPress={() => navigation.goBack()}
          >
            Cancelar
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    fontSize: 18,
  },
});
