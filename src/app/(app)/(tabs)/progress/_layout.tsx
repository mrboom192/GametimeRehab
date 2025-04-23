import { Stack } from "expo-router";
import React from "react";

export default function ProgressLayout() {
  return (
    <Stack screenOptions={{ navigationBarColor: "#FFF" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
