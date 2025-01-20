import { View, Text, ImageBackground } from "react-native";
import React from "react";
import ExerciseCard from "../ExerciseCard";
import RoutineCard from "../RoutineCard";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigateButton from "../buttons/NavigateButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const incompleteRoutines = [
  {
    id: "routine-1",
    routineName: "Rotator Cuff Routine - Week 1, Day 1",
    numExercises: 4,
    totalSets: 12,
    dueDate: "2025-02-10T00:00:00.000Z",
    assignDate: "2025-01-24T00:00:00.000Z",
    assigner: "Kevin Gates",
    difficulty: "Easy - Moderate",
    completed: false, // Indicates the routine is not completed
    tags: [
      { color: "#E5FE2D", text: "REHAB" },
      { color: "#F3F3F3", text: "SHOULDER" },
    ],
  },
  {
    id: "routine-2",
    routineName: "Core Stability Routine - Week 2, Day 3",
    numExercises: 6,
    totalSets: 18,
    dueDate: "2025-02-15T00:00:00.000Z",
    assignDate: "2025-01-25T00:00:00.000Z",
    assigner: "Sarah Johnson",
    difficulty: "Moderate",
    completed: false, // Indicates the routine is not completed
    tags: [
      { color: "#34D399", text: "CORE" },
      { color: "#3B82F6", text: "STRENGTH" },
    ],
  },
  {
    id: "routine-3",
    routineName: "Hamstring Recovery Routine - Week 3, Day 2",
    numExercises: 5,
    totalSets: 15,
    dueDate: "2025-02-20T00:00:00.000Z",
    assignDate: "2025-01-26T00:00:00.000Z",
    assigner: "Dr. Emily Clark",
    difficulty: "Hard",
    completed: false, // Indicates the routine is not completed
    tags: [
      { color: "#F87171", text: "RECOVERY" },
      { color: "#6B7280", text: "HAMSTRING" },
    ],
  },
];

const completedRoutines = [
  {
    id: "routine-4",
    routineName: "Upper Body Strength Routine - Week 4, Day 1",
    numExercises: 8,
    totalSets: 20,
    dueDate: "2025-01-30T00:00:00.000Z",
    assignDate: "2025-01-20T00:00:00.000Z",
    assigner: "John Doe",
    difficulty: "Hard",
    completed: true,
    tags: [
      { color: "#FF4500", text: "UPPER BODY" },
      { color: "#6A5ACD", text: "STRENGTH" },
    ],
  },
  {
    id: "routine-5",
    routineName: "Full-Body Cardio Routine - Week 2, Day 5",
    numExercises: 10,
    totalSets: 25,
    dueDate: "2025-01-28T00:00:00.000Z",
    assignDate: "2025-01-18T00:00:00.000Z",
    assigner: "Jane Smith",
    difficulty: "Moderate",
    completed: true,
    tags: [
      { color: "#FFD700", text: "CARDIO" },
      { color: "#FF6347", text: "FULL BODY" },
    ],
  },
];

const AthleteRoutines = () => {
  // Make sure to only render a maximum number of routines later

  return (
    <SafeAreaView className="flex flex-col justify-between gap-12">
      {/* Section */}
      <View className="flex flex-col gap-4">
        {/* Section header */}
        <View className="flex flex-row justify-between items-center self-stretch">
          <Text className="text-[#2C2C2C] text-4xl">Assigned Routines</Text>
          <NavigateButton
            href="/assigned-exercises"
            title="view all"
            rightIcon={
              <Ionicons name="chevron-forward" size={16} color="#2C2C2C" />
            }
            theme="transparent"
            border={false}
          />
        </View>
        {/* Horizontal of routines */}
        <FlatList
          data={incompleteRoutines}
          renderItem={({ item }) => (
            <RoutineCard
              routineName={item.routineName}
              numExercises={item.numExercises}
              totalSets={item.totalSets}
              dueDate={new Date(item.dueDate)}
              assignDate={new Date(item.assignDate)}
              assigner={item.assigner}
              tags={item.tags}
              completed={item.completed}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          contentContainerStyle={{ gap: 8 }}
        />
      </View>

      {/* Section */}
      <View className="flex flex-col gap-4">
        {/* Section header */}
        <View className="flex flex-row justify-between items-center self-stretch">
          <Text className="text-[#2C2C2C] text-4xl">Completed</Text>
          <NavigateButton
            href="/assigned-exercises"
            title="view all"
            rightIcon={
              <Ionicons name="chevron-forward" size={16} color="#2C2C2C" />
            }
            theme="transparent"
            border={false}
          />
        </View>
        {/* Horizontal of routines */}
        <FlatList
          data={completedRoutines}
          renderItem={({ item }) => (
            <RoutineCard
              routineName={item.routineName}
              numExercises={item.numExercises}
              totalSets={item.totalSets}
              dueDate={new Date(item.dueDate)}
              assignDate={new Date(item.assignDate)}
              assigner={item.assigner}
              tags={item.tags}
              completed={item.completed}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          contentContainerStyle={{ gap: 8 }}
        />
      </View>

      <View className="relative flex w-full rounded-lg py-6 bg-[#2C2C2C] justify-center items-center gap-2 overflow-hidden">
        <Text className="text-white text-2xl">Create new routine</Text>
        <Ionicons name="add" size={24} color="#FFF" />
        <View className="w-1/2">
          <NavigateButton
            href="/assigned-exercises"
            title="create"
            theme="light"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AthleteRoutines;
