import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DishListItem = ({ dish, vendedor }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Articulo", { articulo: dish, vendedor })
      }
      style={styles.container}
    >
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.name}>{dish.nombre.toUpperCase()}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish.descripcion}
        </Text>
        <Text style={styles.price}>$ {dish.precio}</Text>
      </View>
      {dish.imagen && (
        <Image
          source={{ uri: `data:image/gif;base64,${dish.imagen}` }}
          style={styles.image}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 100,
    aspectRatio: 1,
    padding: 10,
    marginRight: 10,
  },
});

export default DishListItem;
