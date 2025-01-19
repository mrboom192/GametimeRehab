import { Stack, Slot } from "expo-router";
import "../../global.css";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { UserProvider } from "../contexts/UserContext";
import * as SplashScreen from "expo-splash-screen";
import { SessionProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <SessionProvider>
      <UserProvider>
        <Stack
          screenOptions={{
            navigationBarColor: "#FFF",
            statusBarBackgroundColor: "#FFF",
            statusBarStyle: "dark",
            headerShown: false,
          }}
        >
          <Stack.Screen name="(signup)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </SessionProvider>
  );
}
