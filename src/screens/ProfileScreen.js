import { StyleSheet } from "react-native";
import React from "react";
import { Button, FormControl, Input, VStack } from "native-base";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <VStack padding={5} flex={1} bgColor={"white"}>
        <FormControl>
          <FormControl.Label>Nombre</FormControl.Label>
          <Input value={user.name} isDisabled style={styles.inputContainer} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellidos</FormControl.Label>
          <Input
            value={user.lastName}
            isDisabled
            style={styles.inputContainer}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Escuela</FormControl.Label>
          <Input
            value={user.escuela}
            isDisabled
            style={styles.inputContainer}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Correo</FormControl.Label>
          <Input value={user.email} isDisabled style={styles.inputContainer} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Telefono</FormControl.Label>
          <Input
            value={user.phoneNumber}
            isDisabled
            style={styles.inputContainer}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Input
            type="password"
            value="**************"
            isDisabled
            style={styles.inputContainer}
          />
        </FormControl>
        <Button
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("EditProfile")}
        >
          Editar Perfil
        </Button>
      </VStack>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    fontSize: 18,
  },
});
