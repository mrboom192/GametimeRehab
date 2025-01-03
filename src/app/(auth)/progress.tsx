import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Progress = () => {
  return (
    <>
      <Stack.Screen />
      <SafeAreaView className="flex flex-col p-5 gap-4"></SafeAreaView>
    </>
  );
};

export default Progress;
