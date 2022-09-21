import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/vendor1.jpeg";

const VendorsCardComponent = ({ vendor }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Vendedor", { id: vendor._id, vendor });
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image
        source={{
          uri: `data:image/gif;base64,${vendor?.imagen}`,
        }}
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{vendor.alias}</Text>
        {/* <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text> */}
        {/* <Text style={styles.rating}>&#11088; {vendor.rating}</Text> */}
      </View>
    </Pressable>
  );
};

export default VendorsCardComponent;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.5,
    color: "#000",
  },
  description: {
    color: "#333A4C",
    marginVertical: 5,
  },
  rating: {
    marginTop: 5,
    fontSize: 16,
    color: "#7D6F58",
  },
  image: {
    // fit content
    aspectRatio: 1,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
