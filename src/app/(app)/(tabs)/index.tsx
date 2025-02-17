import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import Home from "../../../components/screens/Home";
import { useUser } from "../../../contexts/UserContext"; // Import UserContext
import { Stack, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { user, userInfo, loading, initializing } = useUser(); // Assume useUser provides a loading state

  if (loading || initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      </View>
    );
  }

  return (
    <>
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerTitle: () => (
            <Text className="text-[#F1744D] font-medium text-4xl">
              gametime
            </Text>
          ),
          headerRight: () => {
            return (
              <View className="w-10 h-10 mr-4 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                <Text className="text-xl text-white">
                  {userInfo?.first_name?.[0] || "?"}
                </Text>
              </View>
            );
          },
          headerStyle: {
            backgroundColor: "#FBF7F5",
          },

          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <StatusBar backgroundColor={"#FBF7F5"} style="dark" />
      <Home />
    </>
  );
}
