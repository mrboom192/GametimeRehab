import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { UserProvider } from "../contexts/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <Text className="text-[#F1744D] font-medium text-4xl">
                gametime
              </Text>
            ),
          }}
        />
        <Stack.Screen
          name="(signup)"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
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
