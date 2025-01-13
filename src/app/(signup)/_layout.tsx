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
        <Stack.Screen
          name="user-type"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="athlete-details"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="athlete-survey-1"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="athlete-survey-2"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="athlete-survey-3"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="athlete-survey-4"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="trainer-details"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="trainer-survey-1"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="trainer-survey-2"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="trainer-survey-3"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="trainer-survey-4"
          options={{
            statusBarStyle: "dark",
            navigationBarColor: "#FFF",
            headerShadowVisible: false,
            headerTitle: "",
            headerTitleAlign: "center",
          }}
        />
      </Stack>
    </SignupProvider>
  );
};

export default Layout;
