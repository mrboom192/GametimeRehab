import ExerciseHeader from "@/src/components/ExerciseHeader";
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function AssignedLayout() {
  return (
    <View style={styles.container}>
      <ExerciseHeader />

      <Stack
        screenOptions={{
          navigationBarColor: "#FFF",
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="assigned" />
        <Stack.Screen name="create" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
