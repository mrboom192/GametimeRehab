import { View, Text } from "react-native";
import React from "react";
import BarChartIcon from "./icons/BarChartIcon";
import MiniFlame from "./icons/MiniFlame";
import SummaryCard from "./SummaryCard";

interface AthleteDashboardProps {
  firstName: string;
}

const AthleteDashboard: React.FC<AthleteDashboardProps> = ({ firstName }) => {
  return (
    <View className="flex flex-col self-stretch gap-4 pb-4">
      {/* Header */}
      <View className="flex flex-row justify-between items-center">
        <Text
          className="text-3xl flex-1 truncate text-[#2C2C2C] font-medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {firstName || "User"}'s Dashboard
        </Text>
      </View>

      {/* Summary Cards */}
      <View className="flex flex-row self-stretch gap-5 justify-center">
        <SummaryCard
          title="Progress"
          content={
            <View className="flex-1 w-full items-center justify-center">
              <Text className="inline-block text-[#2C2C2C] text-center text-4xl font-normal">
                30%
              </Text>
            </View>
          }
          leftIcon={<BarChartIcon color="#2C2C2C" />}
          note="Ahead of pace"
        />
        <SummaryCard
          title="😄 Injury Feel"
          content={
            <View className="flex-1 w-full items-center justify-center">
              <Text className="inline-block text-[#2C2C2C] text-left font-normal">
                Moderately pain free
              </Text>
            </View>
          }
          note="Pain Progress"
        />
        <SummaryCard
          title="Streak"
          content={
            <View className="flex-1 w-full items-start justify-center">
              <Text className="inline-block text-[#2C2C2C] text-lg text-left font-normal">
                3 Days
              </Text>
              <Text className="inline-block text-[#2C2C2C] text-sm text-left italic font-normal">
                Current Streak
              </Text>
            </View>
          }
          leftIcon={<MiniFlame />}
          note="10 days until PB"
        />
      </View>
    </View>
  );
};

export default AthleteDashboard;
