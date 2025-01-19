import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { UserProvider } from "../contexts/UserContext";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ navigationBarColor: "#FFF" }}>
        <Stack.Screen
          name="(signup)"
          options={{
            statusBarStyle: "dark",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerShown: false,
            headerTitle: (props) => (
              <Text className="text-[#F1744D] font-medium text-4xl">
                gametime
              </Text>
            ),
          }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </UserProvider>
  );
}
