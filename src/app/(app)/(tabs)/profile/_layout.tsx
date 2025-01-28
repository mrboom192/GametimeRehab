import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{ navigationBarColor: "#FFF", statusBarStyle: "dark" }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="pair" />
    </Stack>
  );
}
