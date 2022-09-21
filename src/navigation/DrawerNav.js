import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainScreen from "../screens/MainScreen";
import VendorsScreen from "../screens/VendorsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DishDetailedScreen from "../screens/DishDetailedScreen";
import CustomSidebarMenu from "../components/CustomSidebarMenu";
import { Ionicons } from "@expo/vector-icons";
import BasketDetails from "../screens/BasketDetailsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import { Badge } from "native-base";
import { useSelector } from "react-redux";
import PedidosScreen from "../screens/PedidosScreen";
import PedidoDetailedScreen from "../screens/PedidoDetailedScreen";
import PaymentMethods from "../screens/PaymentMethods";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  //get the basket count from the redux store
  const basketCount = useSelector((state) => state.basket.basket.length);

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
          <View style={{ marginRight: 35, marginBottom: 10 }}>
            {basketCount > 0 && (
              <Badge // bg="red.400"
                colorScheme="danger"
                rounded="full"
                mb={-4}
                mr={-4}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 12,
                }}
              >
                {basketCount}
              </Badge>
            )}

            <Ionicons
              name="cart-outline"
              size={35}
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
        name="MainPedidos"
        component={PedidosNav}
        options={{
          title: "Pedidos",
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilNav}
        options={{
          title: "Perfil",
        }}
      />
      {/* <Drawer.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{
          title: "Notificaciones",
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const VendorStack = createStackNavigator();

const VendorsNav = () => {
  return (
    <VendorStack.Navigator>
      <VendorStack.Screen
        name="Inicio"
        options={{ headerShown: false, title: "Vendedores" }}
        component={DrawerNav}
      />
      <VendorStack.Screen name="Vendedor" component={VendorsScreen} />
      <VendorStack.Screen name="Articulo" component={DishDetailedScreen} />
      <VendorStack.Screen name="Canasta" component={BasketDetails} />
      <VendorStack.Screen name="Pagar" component={PaymentScreen} />
      <VendorStack.Screen
        name="MetodosPago"
        options={{
          title: "Métodos de pago",
        }}
        component={PaymentMethods}
      />
      <VendorStack.Screen
        name="Entrega"
        options={{ headerShown: false }}
        component={DeliveryScreen}
      />
    </VendorStack.Navigator>
  );
};

const PedidosStack = createStackNavigator();

const PedidosNav = () => {
  return (
    <PedidosStack.Navigator initialRouteName="Pedidos">
      <PedidosStack.Screen
        name="Pedidos"
        options={{ headerShown: false }}
        component={PedidosScreen}
      />
      <PedidosStack.Screen
        name="PedidoInd"
        options={{ headerShown: false, title: "Pedido" }}
        component={PedidoDetailedScreen}
      />
    </PedidosStack.Navigator>
  );
};

const PerfilStack = createStackNavigator();

const PerfilNav = () => {
  return (
    <PerfilStack.Navigator initialRouteName="Perfil">
      <PerfilStack.Screen
        name="profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
      <PerfilStack.Screen
        name="EditProfile"
        options={{ headerShown: false, title: "Editar perfil" }}
        component={EditProfileScreen}
      />
    </PerfilStack.Navigator>
  );
};

export default VendorsNav;
