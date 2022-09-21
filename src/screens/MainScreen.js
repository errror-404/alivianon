import { View, FlatList, BackHandler, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import VendorsCardComponent from "../components/VendorsCardComponent";
import VendorsHeader from "../components/VendorsHeader";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { VendedoresApiUrl } from "../api/BaseApiUrl";
import { useDispatch, useSelector } from "react-redux";
import { PedidosApiUrl } from "../api/BaseApiUrl";
import { Spinner } from "native-base";
import { LogoutAction } from "../redux/actions/AuthAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [vendorsList, setVendorsList] = useState(null);
  const [pedido, setPedido] = useState("");
  const user = useSelector((state) => state.user.user);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // if (!hasUnsavedChanges) {
        //   // If we don't have unsaved changes, then we don't need to do anything
        //   return;
        // }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
        Alert.alert(
          "Quieres cerrar sesion?",
          "Aun tienes muchos pedidos por realizar",
          [
            { text: "Cancelar", style: "cancel", onPress: () => {} },
            {
              text: "Cerrar sesion",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen

              onPress: () => {
                dispatch(LogoutAction());
                AsyncStorage.setItem("loggedIn", "false");
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
        // Prompt the user before leaving the screen
      }),
    [isFocused]
  );

  useEffect(() => {
    VendedoresApiUrl.get("getVendedores").then((response) => {
      //filter by escuela
      const filteredVendors = response.data.filter(
        (vendor) => vendor.escuela === user.escuela && vendor.abierto === "true"
      );
      setVendorsList(filteredVendors);
    });
  }, [isFocused]);

  const handlePetition = async () => {
    PedidosApiUrl.get(`/lastPedido${user._id}`)
      .then((response) => {
        setPedido(response.data);
      })
      .catch((error) => {
        console.log("errr", error);
      });
  };

  useEffect(() => {
    handlePetition();
  }, [isFocused]);

  if (!vendorsList) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size={"lg"}></Spinner>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={<VendorsHeader pedido={pedido} />}
        data={vendorsList}
        renderItem={({ item }) => <VendorsCardComponent vendor={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        numColumns={2}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default MainScreen;
