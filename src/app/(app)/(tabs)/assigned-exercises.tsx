import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import ExerciseCard from "@/src/components/ExerciseCard";
import AthleteRoutines from "@/src/components/screens/AthleteRoutines";

const AssignedExercises = () => {
  return (
    <SafeAreaView className="flex-1 flex-col bg-white p-5 gap-4">
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-[#2C2C2C] text-4xl">Assigned Exercises</Text>
          ),
        }}
      />
      <AthleteRoutines />
    </SafeAreaView>
  );
};

export default AssignedExercises;
