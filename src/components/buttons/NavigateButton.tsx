import { Text, Pressable, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface NavigateButtonProps {
  title?: string;
  rightIcon?: React.ReactNode; // Optional icon to display in the button
  leftIcon?: React.ReactNode; // Optional icon to display in the button
  handleSubmit?: () => void;
  theme?: "dark" | "light" | "transparent"; // Theme for the button
  border?: boolean;
  href: any;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({
  title = "Next",
  leftIcon,
  rightIcon,
  handleSubmit,
  theme = "dark", // Default theme is dark
  border = true,
  href,
}) => {
  // Dynamic styles based on the theme
  const isDarkTheme = theme === "dark";
  const isLightTheme = theme === "light";

  return (
    <View
      className={`rounded-lg overflow-hidden ${
        border
          ? isLightTheme
            ? "border border-[#ccc]"
            : "border border-[#2C2C2C]"
          : ""
      } ${isDarkTheme ? "bg-[#2C2C2C]" : isLightTheme ? "bg-white" : ""}`}
    >
      <Link href={href} asChild>
        <Pressable
          android_ripple={{
            color: isDarkTheme ? "#444" : isLightTheme ? "#ddd" : "#ccc", // Ripple color based on theme
            borderless: false,
          }}
          className="py-2.5 px-6 justify-center flex-row items-center gap-2"
          accessibilityLabel={title}
          onPress={handleSubmit}
        >
          {leftIcon}
          <Text
            className={`uppercase ${
              isDarkTheme
                ? "text-white"
                : isLightTheme
                ? "text-black"
                : "text-gray-800"
            }`}
          >
            {title}
          </Text>
          {rightIcon}
        </Pressable>
      </Link>
    </View>
  );
};

export default NavigateButton;
