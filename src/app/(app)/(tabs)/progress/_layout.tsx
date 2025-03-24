import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

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
