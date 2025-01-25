import { Text, Pressable, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface IconButtonProps {
  title?: string;
  icon: React.ReactNode;
  handlePress?: () => void;
  href?: any;
  theme?: "dark" | "light"; // Theme for the button
}

const IconButton: React.FC<IconButtonProps> = ({
  title = "Next",
  icon,
  theme = "dark", // Default theme is dark
  handlePress,
  href,
}) => {
  // Dynamic styles based on the theme
  const isDarkTheme = theme === "dark";
  const isLightTheme = theme === "light";

  return href ? (
    <View className={`rounded-lg overflow-hidden`}>
      <Link href={href} asChild>
        <Pressable
          android_ripple={{
            color: isDarkTheme
              ? "rgba(255, 255, 255, 0.15)"
              : isLightTheme
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
            borderless: false,
          }}
          className={`w-6 h-6 justify-center flex-row items-center gap-2 ${
            isDarkTheme
              ? "text-white"
              : isLightTheme
              ? "text-black"
              : "text-gray-800"
          }`}
          accessibilityLabel={title}
          onPress={handlePress}
        >
          {icon}
        </Pressable>
      </Link>
    </View>
  ) : (
    <View className={`rounded-lg overflow-hidden`}>
      <Pressable
        android_ripple={{
          color: isDarkTheme
            ? "rgba(255, 255, 255, 0.15)"
            : isLightTheme
            ? "rgba(0, 0, 0, 0.1)"
            : "rgba(0, 0, 0, 0.05)",
          borderless: false,
        }}
        className={`w-6 h-6 justify-center flex-row items-center gap-2 ${
          isDarkTheme
            ? "text-white"
            : isLightTheme
            ? "text-black"
            : "text-gray-800"
        }`}
        accessibilityLabel={title}
        onPress={handlePress}
      >
        {icon}
      </Pressable>
    </View>
  );
};

export default IconButton;
