import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";

const BackButton = () => {
  return (
    <TouchableOpacity
      style={{ position: "absolute", left: 16 }}
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back-outline" color={Colors.dark} size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
