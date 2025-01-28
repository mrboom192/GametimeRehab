import { Stack } from "expo-router";

export default function ProgressLayout() {
  return (
    <Stack
      screenOptions={{ navigationBarColor: "#FFF", statusBarStyle: "dark" }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
