import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { format, differenceInWeeks } from "date-fns";

const TrainerProgress = ({
  startDate,
  currentDate,
  recoveryDate,
}: {
  startDate: Date;
  currentDate: Date;
  recoveryDate: Date;
}) => {
  const formattedDate = format(recoveryDate, "MMMM dd, yyyy"); // Example: March 16, 2025
  const weeksBetween = differenceInWeeks(recoveryDate, startDate);

  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        padding: 16,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {/* Progress Title */}
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Feather name="bar-chart" size={16} color={"#FFF"} />
        <Text
          style={{
            color: "#FFF",
            fontFamily: "dm-sb",
            fontSize: 16,
          }}
        >
          Progress
        </Text>
      </View>

      {/* Progress Huge Text!! */}
      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm-sb",
          fontSize: 48,
        }}
      >
        4
      </Text>

      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm-sb",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      >
        Athletes ahead of pace
      </Text>

      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm",
          fontSize: 12,
        }}
      >
        4 out of 12 athletes on your roster area ahead of schedule. Check in on
        the others to see how they're doing.{" "}
      </Text>
    </View>
  );
};

export default TrainerProgress;
