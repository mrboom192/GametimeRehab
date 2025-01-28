import { GestureResponderEvent, View } from "react-native";
import React from "react";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { icon } from "../constants/icon";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: any;
}) => {
  return (
    <View className="justify-center flex-row items-center gap-2 rounded-lg overflow-hidden">
      <PlatformPressable
        onPress={onPress}
        onLongPress={onLongPress}
        className="flex justify-center items-center gap-1 p-2 rounded-lg"
        style={{ backgroundColor: isFocused ? "#222" : "transparent" }}
      >
        {icon[routeName]({ color })}
        {/* <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text> */}
      </PlatformPressable>
    </View>
  );
};

export default TabBarButton;
