import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Calendar } from "react-native-calendars";
import AchievementsCard from "@/src/components/AchievementsCard";
import RecoveryProgressBar from "@/src/components/RecoveryProgressBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import RoutineCard from "@/src/components/RoutineCard";
import CreateNewRoutineButton from "@/src/components/CreateNewRoutineButton";
import Tag from "@/src/components/Tag";
import LabeledInput from "@/src/components/LabeledInput";

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

const RoutineLibrary = () => {
  const [selected, setSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // On calendar: black means they login and complete any assignment, outline means you skipped, multiple black days in a row would be a streak
  // Show 4 most recent achievements on achievements card

  return (
    <ScrollView
      style={{ flex: 1 }}
      //   contentContainerClassName="flex-col bg-white p-5 gap-8"
    >
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-[#2C2C2C] text-4xl">Routine Library</Text>
          ),
        }}
      />

      <View className="flex-col bg-white p-5 gap-8">
        <CreateNewRoutineButton />

        {/* Section */}
        <View className="flex flex-col gap-4">
          {/* Section header */}
          <View className="flex flex-row justify-between items-center self-stretch">
            <Text className="text-[#2C2C2C] text-2xl">Recently Assigned</Text>
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
      </View>

      {/* Divider */}
      <View className="h-px bg-[#ADADAD]" />

      <View className="flex-col bg-white p-5 gap-8">
        <View className="flex flex-col gap-4">
          <Text className="text-[#2C2C2C] text-4xl">Find Routine</Text>

          {/* Routine Type Tags */}
          <View className="flex flex-row gap-2">
            {[
              { color: "#4B4B4B", text: "REHAB" },
              { color: "#4B4B4B", text: "PREHAB" },
              { color: "#4B4B4B", text: "MISCELLANEOUS" },
            ].map((tag, i) => (
              <Tag key={i} color={tag.color} text={tag.text} />
            ))}
          </View>

          {/* Injured part dropdown */}

          {/* Search */}
          <LabeledInput
            placeholder="Search Exercise Library"
            value={searchValue}
            iconLeft={<Ionicons name="search" size={16} color="#717171" />}
            onChangeText={(text) => setSearchValue(text)}
          />
        </View>

        <AchievementsCard />

        <Calendar
          // Customize the appearance of the calendar
          onDayPress={(day: { dateString: React.SetStateAction<string> }) => {
            setSelected(day.dateString);
            console.log("selected day", day);
          }}
          // Specify the current date
          // Callback that gets called when the user selects a day
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "orange",
            },
          }}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            todayBackgroundColor: "#F2754E",
            todayTextColor: "#FFF",
            // textSectionTitleColor: "#b6c1cd",
            // textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "#27272A",
            selectedDayTextColor: "#FFF",
            // todayTextColor: "#00adf5",
            // dayTextColor: "#2d4150",
            // textDisabledColor: "#d9e1e8",
            // dotColor: "#00adf5",
            // selectedDotColor: "#ffffff",
            // arrowColor: "orange",
            // disabledArrowColor: "#d9e1e8",
            // monthTextColor: "blue",
            // indicatorColor: "blue",
            // textDayFontFamily: "monospace",
            // textMonthFontFamily: "monospace",
            // textDayHeaderFontFamily: "monospace",
            // textDayFontWeight: "300",
            // textMonthFontWeight: "bold",
            // textDayHeaderFontWeight: "300",
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16,
          }}
        />
        <RecoveryProgressBar progress={23} color="#6F6E6E" />
        <RecoveryProgressBar
          progress={30}
          color="#78B16C"
          title="Current recovery pace"
        />
      </View>
    </ScrollView>
  );
};

export default RoutineLibrary;
