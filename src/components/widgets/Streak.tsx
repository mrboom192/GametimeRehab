import { View, Text } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Streak = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Widget Header */}
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Ionicons name="flame" size={16} color={"#FFF"} />
        <Text
          style={{
            color: "#FFF",
            fontFamily: "dm-sb",
            fontSize: 16,
          }}
        >
          Streak
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "#FFF",
            fontFamily: "dm-sb",
            fontSize: 24,
          }}
        >
          3 Days
        </Text>
        <Text
          style={{
            color: "#FFF",
            fontFamily: "dm",
            fontSize: 12,
          }}
        >
          Current streak
        </Text>
      </View>

      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm-sb",
          fontSize: 10,
        }}
      >
        10 days until PB
      </Text>
    </View>
  );
};

export default Streak;
