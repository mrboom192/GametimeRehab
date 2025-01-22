import { View, Text } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import RoutineCard from "../RoutineCard";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigateButton from "../buttons/NavigateButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import CreateNewRoutineButton from "../CreateNewRoutineButton";
import { Tabs } from "expo-router";

// Experimental

const routineTypeTags = [
  {
    id: "rehab",
    color: "#E5FE2D",
    label: "rehab",
  },
  {
    id: "prehab",
    color: "#fe2da3",
    label: "prehab",
  },
  {
    id: "miscellaneous",
    color: "#3d3d3d",
    label: "miscellaneous",
  },
];

const injuries = [
  {
    id: "2",
    name: "shoulder",
    category: "muscle",
  },
];

// There are 2 types of tags: exercise type and targeted injuries. All tags under targeted injuries are colored #FFF.

const exercises = [
  {
    id: "1", // Unique identifier for the exercise
    author: "GametimeRehab Team", // User's first and last name
    createdAt: "2015-03-25T12:00:00-06:30",
    isPublic: true, // If true, the exercise will be searchable and addable by other trainers or athletes
    name: "Wall Slide with External Rotation",
    setCount: 3, // Number of sets
    repetitionRange: {
      min: 10, // Minimum repetitions
      max: 12, // Maximum repetitions
    },
    difficulty: "easy",
    description:
      "Stand facing a wall, with your forearms resting on the wall at shoulder height. Slowly slide your hands up the wall, keeping your forearms in contact with the surface. Engage your shoulder blades as you move. Return to the starting position with control.",
    targetedInjuries: ["shoulder", "rotator cuff", "scapular control"], // Injuries or issues this exercise addresses
    tags: [
      {
        id: "rehab",
        color: "#E5FE2D",
        label: "rehab",
      },
    ],
  },
];

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
    exercises: ["1"], // List of exercises using the exercise id
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
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["90%"], []);

  // callbacks
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  // Make sure to only render a maximum number of routines later

  return (
    <GestureHandlerRootView style={styles.container}>
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-[#2C2C2C] text-4xl">Assigned Exercises</Text>
          ),
          headerRight: (props) => (
            <View className="mr-5">
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
          ),
        }}
      />

      <SafeAreaView className="flex-1 flex-col bg-white p-5 justify-start gap-12">
        {/* Section */}
        <View className="flex flex-col gap-4">
          {/* Section header */}
          {/* <View className="flex flex-row justify-between items-center self-stretch">
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
          </View> */}
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
                handleSurveyPress={() => handleSnapPress(0)}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
            contentContainerStyle={{ gap: 8 }}
          />
        </View>

        <CreateNewRoutineButton />
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheet}
        handleIndicatorStyle={styles.handleIndicator}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View className="flex flex-col self-stretch p-6">
            <View className="flex flex-col justify-between items-start h-[2000px]">
              <Text className="text-4xl text-white font-medium">
                Post Session Survey
              </Text>
              <Text className="text-4xl text-white font-medium">
                Awesome 🎉
              </Text>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: { backgroundColor: "#2C2C2C" },
  handleIndicator: {
    backgroundColor: "#fff",
    width: 128,
    marginTop: 8,
    marginBottom: 2,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#2C2C2C",
  },
});

export default AthleteRoutines;
