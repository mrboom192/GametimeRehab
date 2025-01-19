import { Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Calendar } from "react-native-calendars";
import AchievementsCard from "@/src/components/AchievementsCard";
import RecoveryProgressBar from "@/src/components/RecoveryProgressBar";

const Progress = () => {
  const [selected, setSelected] = useState("");

  // On calendar: black means they login and complete any assignment, outline means you skipped, multiple black days in a row would be a streak
  // Show 4 most recent achievements on achievements card

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerClassName="flex-col bg-white p-5 gap-8"
    >
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-[#2C2C2C] text-4xl">Progress</Text>
          ),
        }}
      />

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
    </ScrollView>
  );
};

export default Progress;
