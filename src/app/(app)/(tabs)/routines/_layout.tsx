import ExerciseHeader from "@/src/components/ExerciseHeader";
import { useNavigationState } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SearchContext } from "@/src/contexts/SearchContext";

export default function AssignedLayout() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <View style={{ flex: 1 }}>
        <ExerciseHeader onSearch={setSearchQuery} />
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
    </SearchContext.Provider>
  );
}
