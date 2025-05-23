import { View, Text } from "react-native";
import React from "react";
import { format } from "date-fns";
import MoreHorizontal from "./icons/MoreHorizontal";
import Tag from "./Tag";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./buttons/IconButton";
import NavigateButton from "./buttons/NavigateButton";
import GametimeIcons from "./icons/GametimeIcons";

// For future
const difficultyMap = { 1: "Easy", 2: "Medium", 3: "Hard" };

type RoutineCardProps = {
  routineName?: string;
  numExercises?: number;
  totalSets?: number;
  dueDate?: Date;
  assignDate?: Date;
  assigner?: string;
  tags?: { color: string; text: string }[];
  completed: boolean;
  handleSurveyPress?: () => void;
};

const RoutineCard: React.FC<RoutineCardProps> = ({
  routineName = "Exercise Placeholder Name",
  numExercises = 4,
  totalSets = 12,
  dueDate = new Date(),
  assignDate = new Date(),
  assigner = "Trainer Name",
  tags = [{ color: "#FFF", text: "shoulder" }],
  completed,
  handleSurveyPress,
}) => {
  function truncateString(str = "", maxLength = 36) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }

  return (
    <View className="inline-flex w-[400px] p-3.5 justify-start items-start gap-2 rounded-lg bg-[#2C2C2C]">
      {/* Routine header */}
      <View className="flex flex-row items-center justify-between gap-2 self-stretch">
        <GametimeIcons name="RoutinesGroup" color="#FFF" size={24} />
        <Text
          className="text-white flex flex-1 text-lg font-semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {truncateString(routineName, 36)}
        </Text>
        <IconButton icon={<MoreHorizontal />} href="/routines/assigned" />
      </View>

      {/* Routine details */}
      <View className="flex flex-col">
        <Text className="text-white">{numExercises} Exercises</Text>
        <Text className="text-white">{totalSets} Sets Total</Text>
      </View>

      {/* Routine due date */}
      <View>
        <Text className="text-white">
          Due by: {format(dueDate, "MMM do, yyyy")}
        </Text>
        <Text className="text-orange-400 text-sm">Easy - Moderate</Text>
      </View>

      {/* Routine assigner */}
      <Text className="text-white">
        Assigned by: <Text className="font-bold">{assigner}</Text> on{" "}
        {format(assignDate, "MMM do, yyyy")}
      </Text>

      {/* Routine Footer */}
      <View className="flex flex-row self-stretch justify-between items-center ">
        {/* Routine tags */}
        <View className="flex flex-row gap-2">
          {tags.map((tag, i) => (
            <Tag key={i} color={tag.color} text={tag.text} />
          ))}
        </View>

        {/* Start exercise button */}
        {completed ? (
          <Ionicons name="checkmark" size={24} color="#30B343" />
        ) : (
          <IconButton
            icon={<Ionicons name="chevron-forward" size={16} color="#FFF" />}
            href="/routines/assigned"
          />
        )}
      </View>

      {completed ? (
        <View className="flex self-stretch mt-4">
          <NavigateButton
            href="/routines/assigned"
            title="review post session survey"
            theme="light"
            handleSubmit={handleSurveyPress}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default RoutineCard;
