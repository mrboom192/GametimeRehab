import { Stack } from "expo-router";

export default function AssignedLayout() {
  return (
    <Stack
      screenOptions={{ navigationBarColor: "#FFF", statusBarStyle: "dark" }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="assigned" />
      <Stack.Screen name="create" />
    </Stack>
  );
}
