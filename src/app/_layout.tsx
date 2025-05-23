import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Ensure expo-status-bar is used
import React from "react";
import { UserProvider } from "../contexts/UserContext";
import { SessionProvider } from "../contexts/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    dm: require("../../assets/fonts/DMSans-Regular.ttf"),
    "dm-sb": require("../../assets/fonts/DMSans-SemiBold.ttf"),
    "dm-b": require("../../assets/fonts/DMSans-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
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
