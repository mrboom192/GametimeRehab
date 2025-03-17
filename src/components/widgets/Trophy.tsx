import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

const Trophy = ({
  name,
  image,
  color,
}: {
  name: string;
  image: ImageSourcePropType;
  color: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: hexToRgba(color, 0.2),
        padding: 16,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 16,
      }}
    >
      <Image source={image} style={{ width: 40, height: 40 }} />
      <Text
        style={{
          color: color,
          fontFamily: "dm-sb",
          fontSize: 16,
          flex: 1,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default Trophy;

const hexToRgba = (hex: string, alpha: number) => {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Convert shorthand hex (e.g., "#abc") to full form ("#aabbcc")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Extract RGB values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Convert to RGBA
};
