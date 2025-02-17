import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AssignedLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFF" />

      <Stack screenOptions={{ navigationBarColor: "#FFF" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="assigned" />
        <Stack.Screen name="create" />
      </Stack>
    </>
  );
}
