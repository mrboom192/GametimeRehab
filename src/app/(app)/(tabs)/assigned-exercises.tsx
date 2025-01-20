import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import ExerciseCard from "@/src/components/ExerciseCard";
import AthleteRoutines from "@/src/components/screens/AthleteRoutines";

const AssignedExercises = () => {
  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-[#2C2C2C] text-4xl">Assigned Routines</Text>
          ),
        }}
      />
      <StatusBar translucent backgroundColor="transparent" />
      <AthleteRoutines />
    </>
  );
};

export default AssignedExercises;
