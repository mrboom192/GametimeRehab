import { View, Text } from "react-native";
import React from "react";
import GraphArrowIncrease from "./icons/GraphArrowIncrease";

interface SummaryCardProps {
  leftIcon?: React.ReactNode; // Optional icon to display in the input
  content?: React.ReactNode; // Optional icon to display in the input
  title: string;
  note: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  note,
  leftIcon,
  content,
}) => {
  return (
    <View className="border border-gray-200 flex flex-col w-32 h-32 p-2 justify-between items-start bg-white rounded-lg">
      <View className="flex flex-row items-center gap-1.5">
        {leftIcon}
        <Text className="text-[#2C2C2C] text-center font-normal">{title}</Text>
      </View>
      {content}
      <Text className="self-stretch text-green-500 text-center text-xs font-normal">
        {note}
      </Text>
    </View>
  );
};

export default SummaryCard;
