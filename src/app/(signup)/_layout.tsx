import { SignupProvider } from "@/src/contexts/SignupContext";
import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

const Layout = () => {
  return (
    <SignupProvider>
      <Stack>
        <Stack.Screen
          name="signup"
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
      </Stack>
    </SignupProvider>
  );
};

export default Layout;
