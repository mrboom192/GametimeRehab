import { Text, Pressable, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface IconButtonProps {
  title?: string;
  icon: React.ReactNode;
  handlePress?: () => void;
  href: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  title = "Next",
  icon,
  handlePress,
  href,
}) => {
  return (
    <View className={`rounded-lg overflow-hidden`}>
      <Link href={href} asChild>
        <Pressable
          android_ripple={{
            color: "rgba(255, 255, 255, 0.15)",
            borderless: false,
          }}
          className="w-6 h-6  justify-center flex-row items-center gap-2"
          accessibilityLabel={title}
          onPress={handlePress}
        >
          {icon}
        </Pressable>
      </Link>
    </View>
  );
};

export default IconButton;
