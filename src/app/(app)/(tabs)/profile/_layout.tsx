import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Import StatusBar

export default function ProfileLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFF" />

      <Stack screenOptions={{ navigationBarColor: "#FFF" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="pair" />
      </Stack>
    </>
  );
}
