import { Text, Pressable, Image } from "react-native";
import { useUser } from "../contexts/UserContext";
import Colors from "../constants/Colors";
import React from "react";

const Avatar = ({ onPress, size }: { onPress: () => void; size: number }) => {
  const { userInfo } = useUser();

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
      {userInfo.image ? (
        <Image
          source={{ uri: userInfo.image }}
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
          {userInfo.first_name[0]}
          {userInfo.last_name[0]}
        </Text>
      )}
    </Pressable>
  );
};

export default Avatar;
