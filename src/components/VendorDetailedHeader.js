import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";

const VendorDetailedHeader = ({ restaurant }) => {
  return (
    <View style={styles.page}>
      {/* <Image
        source={{ uri: `data:image/gif;base64,${restaurant.imagen}` }}
        style={styles.image}
      /> */}

      <View style={styles.container}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};

export default VendorDetailedHeader;

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
    width: "100%",
    aspectRatio: 5 / 3,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  container: {
    margin: 10,
  },
});
