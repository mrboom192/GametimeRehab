import { Text, Pressable, Image } from "react-native";
import { useUser } from "../contexts/UserContext";
import Colors from "../constants/Colors";
import React from "react";

const Avatar = ({
  onPress = null,
  size,
  uri,
  initials = "",
}: {
  onPress?: null | (() => void);
  size: number;
  uri: string; // Update later
  initials?: string;
}) => {
  return (
    <Pressable
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        backgroundColor: Colors.faintGrey,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: Colors.faintGrey,
        overflow: "hidden",
      }}
      onPress={onPress}
    >
      {uri ? (
        <Image
          source={{ uri: uri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            fontFamily: "dm-sb",
            color: Colors.grey,
            marginHorizontal: 8,
            textAlign: "center",
          }}
        >
          {initials}
        </Text>
      )}
    </Pressable>
  );
};

export default Avatar;
