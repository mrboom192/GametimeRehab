import { View, Text } from "react-native";
import React from "react";
import ExerciseCard from "../ExerciseCard";
import RoutineCard from "../RoutineCard";

const AthleteRoutines = () => {
  return (
    <View className="flex flex-col justify-between gap-2">
      <View>
        <RoutineCard exerciseName="Rotator Cuff Routine - Week 1, Day 1" />
      </View>
      <View className="flex flex-row gap-2">
        <ExerciseCard />
        <ExerciseCard />
      </View>
    </View>
  );
};

export default AthleteRoutines;
