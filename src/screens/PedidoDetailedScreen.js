import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Moment from "react-moment";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import BasketDishItem from "../components/BasketDishItem";

const PedidoHeader = ({ pedido, vendedor }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.page}>
        <Image
          source={{ uri: `data:image/gif;base64,${vendedor.imagen}` }}
          style={styles.image}
        />
        <TouchableOpacity style={{ position: "absolute", left: 0 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-circle"
            size={45}
            color="white"
            style={styles.iconContainer}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.title}>{vendedor.alias}</Text>
          <Text style={styles.subtitle}>
            {pedido.estado} &#8226;{" "}
            <Moment
              locale="es"
              element={Text}
              fromNow
              style={{ color: "black" }}
            >
              {pedido.fecha}
            </Moment>
          </Text>
        </View>
      </View>
    </View>
  );
};

const PedidoDetailedScreen = () => {
  const route = useRoute();
  const { pedido, vendedor } = route.params;

  if (!pedido || !vendedor) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <PedidoHeader pedido={pedido} vendedor={vendedor} />
      )}
      data={pedido.articulos}
      renderItem={({ item }) => <BasketDishItem dish={item} isOrder={true} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default PedidoDetailedScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    aspectRatio: 7 / 4,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
    color: "black",
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
    color: "#7D6F58",
  },
  subtitle: {
    fontSize: 15,
    color: "#7D6F58",
  },
  container: {
    margin: 10,
  },
});
