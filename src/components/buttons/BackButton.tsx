import { TouchableOpacity } from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";

const DEFAULT_ICONBUTTON_SIZE = 40;

const BackButton = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableOpacity
      style={{
        height: DEFAULT_ICONBUTTON_SIZE,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress ? onPress : () => router.back()}
    >
      <Ionicons name="arrow-back-outline" color={Colors.dark} size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
