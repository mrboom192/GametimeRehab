import { Text, Pressable, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface NavigateButtonProps {
  title?: string;
  rightIcon?: React.ReactNode; // Optional icon to display in the input
  leftIcon?: React.ReactNode; // Optional icon to display in the input
  handleSubmit?: () => void;
  fill?: boolean;
  href: any;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({
  title = "Next",
  leftIcon,
  rightIcon,
  handleSubmit,
  fill,
  href,
}) => {
  return (
    <View
      className={`rounded-lg overflow-hidden border  ${
        fill ? "bg-[#2C2C2C]" : ""
      }`}
    >
      <Link href={href} asChild>
        <Pressable
          android_ripple={{
            color: fill ? "#444" : "#ccc",
            borderless: false,
          }}
          className="py-2.5 px-6 justify-center flex-row items-center gap-2"
          accessibilityLabel={title}
          onPress={handleSubmit}
        >
          {leftIcon}
          <Text className={`uppercase ${fill ? "text-white" : "text-black"}`}>
            {title}
          </Text>
          {rightIcon}
        </Pressable>
      </Link>
    </View>
  );
};

export default NavigateButton;
