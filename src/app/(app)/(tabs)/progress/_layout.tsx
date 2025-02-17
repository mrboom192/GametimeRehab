import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProgressLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFF" />

      <Stack screenOptions={{ navigationBarColor: "#FFF" }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
