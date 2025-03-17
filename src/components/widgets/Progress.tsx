import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { format, differenceInWeeks } from "date-fns";

const Progress = ({
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
        30%
      </Text>

      <Text
        style={{
          color: "#FFF",
          fontFamily: "dm-sb",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      >
        Ahead of pace
      </Text>

      <Text
        style={{
          color: Colors.grey2,
          fontFamily: "dm",
          fontSize: 12,
        }}
      >
        Your estimated time to recovery has reduced by 1 week!
      </Text>

      <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
        <ProgressBar progress={30} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: Colors.grey2,
              fontFamily: "dm",
              fontSize: 10,
            }}
          >
            Week 0
          </Text>
          <Text
            style={{
              color: Colors.grey2,
              fontFamily: "dm",
              fontSize: 10,
            }}
          >
            Week {weeksBetween}
          </Text>
        </View>
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

export default Progress;
