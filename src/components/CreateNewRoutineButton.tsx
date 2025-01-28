import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import NavigateButton from "./buttons/NavigateButton";

const CreateNewRoutineButton = () => {
  // Fix the href and make it activate a modal instead

  return (
    <View className="relative flex w-full rounded-lg py-6 bg-[#2C2C2C] justify-center items-center gap-2 overflow-hidden">
      <Text className="text-white text-2xl">Create new routine</Text>
      <Ionicons name="add" size={24} color="#FFF" />
      <View className="w-1/2">
        <NavigateButton href="/routines/create" title="create" theme="light" />
      </View>
    </View>
  );
};

export default CreateNewRoutineButton;
