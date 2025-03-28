import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { format, differenceInWeeks } from "date-fns";

const QuickUpdates = ({}: {}) => {
  return (
    <View
      style={{
        padding: 16,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 16,
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.dark,
      }}
    >
      {/* Widget Title */}
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Feather name="bell" size={16} color={Colors.dark} />
        <Text
          style={{
            color: Colors.dark,
            fontFamily: "dm-sb",
            fontSize: 16,
          }}
        >
          Quick Updates
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{ fontFamily: "dm-sb", fontSize: 16, color: Colors.grey2 }}
        >
          No updates
        </Text>
      </View>
    </View>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View
      style={{
        height: 12,
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <View
        style={[
          {
            height: "100%",
            backgroundColor: "#78B16C",
            borderRadius: 0,
          },
          { width: `${progress}%` },
        ]}
      />
    </View>
  );
};

export default QuickUpdates;
