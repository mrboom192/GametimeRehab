import { Text, ScrollView, View, FlatList } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Calendar } from "react-native-calendars";
import AchievementsCard from "@/src/components/AchievementsCard";
import RecoveryProgressBar from "@/src/components/RecoveryProgressBar";
import CreateNewRoutineButton from "@/src/components/CreateNewRoutineButton";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tag from "@/src/components/Tag";

const CreateRoutine = () => {
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
            <Text className="text-[#2C2C2C] text-4xl">Create New Routine</Text>
          ),
        }}
      />

      <View className="flex-col bg-white p-5 gap-8">
        {/* Routine Type Tags */}
        <View className="flex flex-col gap-2">
          <Text className="text-[#525252] text-lg">Routine Type</Text>
          <View className="flex flex-row gap-2">
            {[
              { color: "#4B4B4B", text: "REHAB" },
              { color: "#4B4B4B", text: "PREHAB" },
              { color: "#4B4B4B", text: "MISCELLANEOUS" },
            ].map((tag, i) => (
              <Tag key={i} color={tag.color} text={tag.text} />
            ))}
          </View>
        </View>

        {/* Routine Type Tags */}
        <View className="flex flex-col gap-2">
          <Text className="text-[#525252] text-lg">Due</Text>
          <View className="flex flex-row gap-2">
            {[{ color: "#4B4B4B", text: "MON 00,0000" }].map((tag, i) => (
              <Tag key={i} color={tag.color} text={tag.text} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateRoutine;
