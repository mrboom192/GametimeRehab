import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/src/components/Drawer/CustomDrawerContent";
import { TextRegular } from "@/src/components/StyledText";
import BackButton from "@/src/components/buttons/BackButton";

const DrawerRootLayout = () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Drawer>
  );
};

export default DrawerRootLayout;
