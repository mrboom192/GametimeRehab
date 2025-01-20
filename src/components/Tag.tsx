import { View, Text } from "react-native";
import React from "react";

const Tag = ({ color = "#FFF", text = "tag" }) => {
  return (
    <View
      className="py-1 px-3 border rounded-full"
      style={{ borderColor: color }}
    >
      <Text className="uppercase text-sm" style={{ color: color }}>
        {text}
      </Text>
    </View>
  );
};

export default Tag;
