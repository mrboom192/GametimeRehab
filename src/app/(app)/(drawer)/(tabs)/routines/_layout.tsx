import ExerciseHeader from "@/src/components/ExerciseHeader";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function AssignedLayout() {
  return (
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
  );
}
