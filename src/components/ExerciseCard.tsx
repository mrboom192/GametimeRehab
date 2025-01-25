import { View, Text } from "react-native";
import React from "react";
import Weight from "./icons/Weight";
import More2 from "./icons/More2";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./buttons/IconButton";

const ExerciseCard = ({
  exerciseName = "Exercise Placeholder Name",
  numSets = 3,
  minReps = 8,
  maxReps = 12,
  backgroundColor = "#2C2C2C",
}) => {
  return (
    <View
      className="inline-flex self-stretch p-3 justify-center items-start rounded-lg"
      style={{
        backgroundColor,
      }}
    >
      <View className="flex flex-row items-center justify-between gap-2 self-stretch mb-2">
        <View className="flex flex-row gap-2 items-center">
          <Weight />
          <Text className="text-white font-semibold" ellipsizeMode="tail">
            {exerciseName}
          </Text>
        </View>
        <IconButton
          icon={<Ionicons name="ellipsis-vertical" size={16} color="#FFF" />}
          theme="dark"
        />
      </View>
      <View className="flex flex-col mb-2">
        <Text className="text-white">{numSets} Sets</Text>
        <Text className="text-white">
          {minReps}-{maxReps} Reps
        </Text>
      </View>
      <Text className="text-orange-400 text-[10px]">Medium difficulty</Text>
    </View>
  );
};

export default ExerciseCard;
