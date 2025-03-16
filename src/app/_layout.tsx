import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Ensure expo-status-bar is used
import React from "react";
import { UserProvider } from "../contexts/UserContext";
import { SessionProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  // Need to change font to dm-sans

  return (
    <SessionProvider>
      <UserProvider>
        <StatusBar style="dark" backgroundColor="#FFF" />
        <Stack
          screenOptions={{
            navigationBarColor: "#FFF",
            headerShown: false,
          }}
        >
          <Stack.Screen name="(signup)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </SessionProvider>
  );
}
