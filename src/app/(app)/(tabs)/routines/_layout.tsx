import ExerciseHeader from "@/src/components/ExerciseHeader";
import { useNavigationState } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SearchProvider } from "@/src/contexts/SearchContext";

export default function AssignedLayout() {
  return (
    <SearchProvider>
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
    </SearchProvider>
  );
}
