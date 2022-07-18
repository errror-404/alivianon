import { SafeAreaView, View, FlatList, BackHandler } from "react-native";
import React, { useEffect } from "react";
import vendors from "../data/vendedores.json";
import VendorsCardComponent from "../components/VendorsCardComponent";
import VendorsHeader from "../components/VendorsHeader";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const MainScreen = () => {
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

  return (
    <View>
      <FlatList
        ListHeaderComponent={<VendorsHeader />}
        data={vendors}
        renderItem={({ item }) => <VendorsCardComponent vendor={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default MainScreen;
