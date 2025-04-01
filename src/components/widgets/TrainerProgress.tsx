import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { format, differenceInWeeks } from "date-fns";
import { useUser } from "@/src/contexts/UserContext";

const TrainerProgress = ({
  startDate,
  currentDate,
  recoveryDate,
  data,
}: {
  startDate: Date;
  currentDate: Date;
  recoveryDate: Date;
  data?: any;
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
        {data && data.athletes ? data.athletes.length : "0"}
      </Text>

      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm-sb",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      >
        Athletes in your roster
      </Text>

      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm",
          fontSize: 12,
        }}
      >
        As a trainer, you have{" "}
        {data && data.athletes ? data.athletes.length : "0"} athletes in your
        roster.
      </Text>
    </View>
  );
};

export default TrainerProgress;
