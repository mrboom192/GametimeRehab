import ExerciseHeader from "@/src/components/ExerciseHeader";
import { CartProvider } from "@/src/contexts/CartContext";
import { useNavigationState } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function AssignedLayout() {
  return (
    <CartProvider>
      <View style={{ flex: 1 }}>
        <ExerciseHeader />
        <Stack
          screenOptions={{
            navigationBarColor: "#FFF",
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="[id]" />
        </Stack>
      </View>
    </CartProvider>
  );
}
