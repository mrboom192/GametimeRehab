import { View, Text } from "react-native";
import React from "react";
import StreakFlame from "./icons/StreakFlame";

const AchievementsCard = () => {
  return (
    <View className="flex flex-col p-6 bg-[#2C2C2C] rounded-lg">
      <Text className="text-white font-medium text-[32px]">Achievements</Text>

      <View className="flex flex-row self-stretch justify-around items-center">
        <View className="flex flex-col items-start">
          <View className="flex flex-row gap-1 items-center">
            <Text className="text-white text-[50px]">3</Text>
            <Text className="text-white text-[10px]">Days</Text>
          </View>

          <Text className="text-white">{"Current\nStreak"}</Text>
        </View>
        <View className="flex flex-col items-start">
          <View className="flex flex-row gap-1 items-center">
            <Text className="text-stone-500 text-[50px]">12</Text>
            <Text className="text-stone-500 text-[10px]">Days</Text>
          </View>

          <Text className="text-stone-500">{"Longest\nStreak"}</Text>
        </View>
        <StreakFlame />
      </View>
    </View>
  );
};

export default AchievementsCard;
