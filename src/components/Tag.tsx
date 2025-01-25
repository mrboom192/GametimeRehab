import { Text, Pressable } from "react-native";
import React from "react";

interface TagProps {
  color: string;
  text: string;
  handlePress?: () => void;
  selected?: boolean;
}

const Tag: React.FC<TagProps> = ({
  color = "#FFF",
  text,
  selected = false,
  handlePress,
}) => {
  return (
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
  );
};

export default Tag;
