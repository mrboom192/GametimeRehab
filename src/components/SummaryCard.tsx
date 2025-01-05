import { View, Text } from "react-native";
import React from "react";
import GraphArrowIncrease from "./icons/GraphArrowIncrease";

const SummaryCard = () => {
  return (
    <View className="flex flex-col w-28 h-28 p-2 justify-between items-start bg-white rounded-lg">
      <View className="flex flex-row items-center gap-1">
        <GraphArrowIncrease />
        <Text className="text-[#2C2C2C] text-center text-sm font-normal">
          Progress
        </Text>
      </View>
      <Text className="self-stretch text-[#2C2C2C]text-center text-4xl font-normal">
        30%
      </Text>
      <Text className="self-stretch text-green-500 text-center text-xs font-normal uppercase">
        Ahead of pace
      </Text>
    </View>
  );
};

export default SummaryCard;
