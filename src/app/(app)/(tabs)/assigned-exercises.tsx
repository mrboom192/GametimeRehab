import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import ExerciseCard from "@/src/components/ExerciseCard";
import AthleteRoutines from "@/src/components/screens/AthleteRoutines";

const AssignedExercises = () => {
  return <AthleteRoutines />;
};

export default AssignedExercises;
