import { View, Text } from "react-native";
import React from "react";
import StreakFlame from "./icons/StreakFlame";
import Weight from "./icons/Weight";
import More2 from "./icons/More2";

// For future
const difficultyMap = { 1: "Easy", 2: "Medium", 3: "Hard" };

const ExerciseCard = ({
  exerciseName = "Exercise Placeholder Name",
  numSets = 4,
  minReps = 6,
  maxReps = 12,
}) => {
  return (
    <View className="inline-flex h-36 p-3 justify-center items-start rounded-lg bg-[#2C2C2C]">
      <View className="flex flex-row items-start justify-between gap-2 self-stretch">
        <Weight />
        <Text
          className="text-white font-semibold w-24"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {exerciseName}
        </Text>
        <More2 />
      </View>
      <Text className="text-white">{numSets} Sets</Text>
      <Text className="text-white">
        {minReps}-{maxReps} Reps
      </Text>
      <Text className="text-white text-xs">Due Dec 30, 2024</Text>
      <Text className="text-orange-400 text-[10px]">Medium difficulty</Text>
    </View>
  );
};

export default ExerciseCard;
