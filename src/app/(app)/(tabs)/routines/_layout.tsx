import ExerciseHeader from "@/src/components/ExerciseHeader";
import { Stack } from "expo-router";
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
