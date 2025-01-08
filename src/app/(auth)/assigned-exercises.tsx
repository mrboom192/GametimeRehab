import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import ExerciseCard from "@/src/components/ExerciseCard";

const AssignedExercises = () => {
  return (
    <SafeAreaView className="flex-1 flex-col bg-white p-5 gap-4">
      <Stack.Screen
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
      <View className="flex flex-row justify-between">
        <ExerciseCard />
        <ExerciseCard />
      </View>
    </SafeAreaView>
  );
};

export default AssignedExercises;
