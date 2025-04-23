import "../../global.css";
import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../contexts/UserContext";
import { SessionProvider } from "../contexts/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
  DMSans_600SemiBold,
} from "@expo-google-fonts/dm-sans";
import { CartProvider } from "../contexts/CartContext";
import { RoutineSessionProvider } from "../contexts/RoutineSessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ConfettiProvider } from "../contexts/ConfettiContext";
import { ExerciseProvider } from "../contexts/ExerciseContext";
import { RoutinesProvider } from "../contexts/RoutinesContext";
import { SearchProvider } from "../contexts/SearchContext";

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
    DMSans_400Regular,
    DMSans_600SemiBold,
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <UserProvider>
          <CartProvider>
            <RoutinesProvider>
              <RoutineSessionProvider>
                <ExerciseProvider>
                  <SearchProvider>
                    <ConfettiProvider>
                      <Stack
                        screenOptions={{
                          navigationBarColor: "#FFF",
                          headerShown: false,
                        }}
                      />
                    </ConfettiProvider>
                  </SearchProvider>
                </ExerciseProvider>
              </RoutineSessionProvider>
            </RoutinesProvider>
          </CartProvider>
        </UserProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
