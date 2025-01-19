import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import Home from "../../components/screens/Home";
import { useUser } from "../../contexts/UserContext"; // Import UserContext
import { Stack } from "expo-router";

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
  // https://docs.expo.dev/router/reference/authentication/
  return (
    <>
      <Stack.Screen
        options={{
          statusBarStyle: "dark",
          statusBarBackgroundColor: "#FBF7F5",
          headerStyle: {
            backgroundColor: "#FBF7F5",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => {
            return null;
            // return user ? <Ionicons name="menu" size={32} /> : null;
          },
          headerTitle: () => (
            <Text className="text-[#F1744D] font-medium text-4xl">
              gametime
            </Text>
          ),
          headerRight: () => {
            return (
              <View className="w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                <Text className="text-xl text-white">
                  {userInfo?.first_name?.[0] || "?"}
                </Text>
              </View>
            );
          },
        }}
      />
      <Home />
    </>
  );
}
