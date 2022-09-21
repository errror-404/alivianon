import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import DonateButton from "./DonateButton";
import { useDispatch } from "react-redux";

const CustomSidebarMenu = (props) => {
  const height = Dimensions.get("window").height;

  const handleLogout = () => {
    props.navigation.navigate("auth");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Cerrar Sesión" onPress={handleLogout} />
      </DrawerContentScrollView>
      <DonateButton />

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 10,
            backgroundColor: "#f2f2f2",
            height: height * 0.1,
            width: "100%",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderTopColor: "#eaeaea",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/waterberrydev")
            }
          >
            <Entypo name="facebook" size={24} color="#475223" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/waterberrydev/")
            }
          >
            <Entypo name="instagram" size={24} color="#475223" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com/WaterBerryDev")}
          >
            <Entypo name="twitter" size={24} color="#475223" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/company/waterberry/dev")
            }
          >
            <Entypo name="linkedin" size={24} color="#475223" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
