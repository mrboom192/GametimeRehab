import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import Home from "../components/screens/Home";
import SignIn from "../components/screens/SignIn"; // Import SignIn
import { useUser } from "../contexts/UserContext"; // Import UserContext
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  const { user, userInfo, loading, initializing } = useUser(); // Assume useUser provides a loading state

  if (loading || initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      </View>
    );
  }

  // Change how this is done later
  return (
    <>
      <Stack.Screen
        options={{
          statusBarStyle: "dark",
          statusBarBackgroundColor: user ? "#FBF7F5" : "#FFF",
          headerStyle: {
            backgroundColor: user ? "#FBF7F5" : "#FFF",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => {
            return user ? <Ionicons name="menu" size={32} /> : null;
          },
          headerTitle: () => (
            <Text className="text-[#F1744D] font-medium text-4xl">
              gametime
            </Text>
          ),
          headerRight: () => {
            return user ? (
              <View className="w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                <Text className="text-xl text-white">
                  {userInfo?.first_name?.[0] || "?"}
                </Text>
              </View>
            ) : null;
          },
        }}
      />
      {user ? <Home /> : <SignIn />}
    </>
  );
}
