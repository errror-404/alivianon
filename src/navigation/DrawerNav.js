import * as React from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainScreen from "../screens/MainScreen";
import VendorsScreen from "../screens/VendorsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DishDetailedScreen from "../screens/DishDetailedScreen";
import CustomSidebarMenu from "../components/CustomSidebarMenu";
import { Ionicons } from "@expo/vector-icons";
import BasketDetails from "../screens/BasketDetails";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Text } from "native-base";

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        drawerActiveTintColor: "tomato",
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="cart-outline"
              size={25}
              color="black"
              onPress={() => navigation.navigate("Canasta")}
            />
          </View>
        ),
      })}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: "Vendedores",
        }}
      />
      <Drawer.Screen
        name="Pedidos"
        component={NotificationsScreen}
        options={{
          title: "Pedidos",
        }}
      />
      <Drawer.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{
          title: "Notificaciones",
        }}
      />
    </Drawer.Navigator>
  );
};

const VendorStack = createStackNavigator();

const VendorsNav = () => {
  // const navigation = useNavigation();
  return (
    <VendorStack.Navigator>
      <VendorStack.Screen
        name="Inicio"
        options={{ headerShown: false }}
        component={DrawerNav}
      />
      <VendorStack.Screen name="Vendedor" component={VendorsScreen} />
      <VendorStack.Screen name="Articulo" component={DishDetailedScreen} />
      <VendorStack.Screen
        name="Canasta"
        component={BasketDetails}
        options={() => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("CheckOut")}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  marginRight: 10,
                  fontWeight: "400",
                }}
              >
                Pagar
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <VendorStack.Screen name="CheckOut" component={DishDetailedScreen} />
    </VendorStack.Navigator>
  );
};

export default VendorsNav;
