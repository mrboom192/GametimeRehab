import React from "react";
import { Text, Pressable, View } from "react-native";

interface TagProps {
  color: string;
  text: string;
  handlePress?: () => void;
  selected?: boolean;
  notificationCount?: number; // Optional prop for notification count
}

const Tag: React.FC<TagProps> = ({
  color = "#FFF",
  text,
  selected = false,
  handlePress,
  notificationCount,
}) => {
  return (
    <View style={{ position: "relative" }}>
      <Pressable
        className="py-1 px-3 border rounded-full"
        style={{
          borderColor: color,
          backgroundColor: selected ? color : "transparent", // Change background color if selected
        }}
        onPress={handlePress}
      >
        <Text
          className="uppercase text-sm"
          style={{ color: selected ? "#FFF" : color }}
        >
          {text}
        </Text>
      </Pressable>
      {notificationCount !== undefined && notificationCount > 0 && (
        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full h-5 w-5 justify-center items-center">
          <Text className="text-white text-sm font-bold">
            {notificationCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Tag;
