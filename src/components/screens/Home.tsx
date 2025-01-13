import { View, Text, Button, SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import AchievementsCard from "@/src/components/AchievementsCard";
import { useUser } from "@/src/contexts/UserContext";
import NavigateButton from "@/src/components/NavigateButton";
import AthleteDashboard from "@/src/components/AthleteDashboard";

export default function Home() {
  const { userInfo } = useUser();

  return (
    <SafeAreaView className="flex-1 flex-col bg-white p-5 gap-4">
      <View className="absolute -top-[45%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FBF7F5] rounded-full" />

      <Stack.Screen />

      <AthleteDashboard firstName={userInfo?.first_name} />

      {/* Progress button */}
      <View className="flex justify-between items-end">
        <NavigateButton
          href="/progress"
          title="view progress"
          rightIcon={<Ionicons name="chevron-forward" size={16} color="#FFF" />}
          fill={true}
        />
      </View>
      <AchievementsCard />
      <Button title="Sign out" onPress={() => auth().signOut()} />

      {/* Exercises button */}
      <View className="flex justify-between items-end">
        <NavigateButton
          href="/assigned-exercises"
          title="exercises"
          rightIcon={<Ionicons name="chevron-forward" size={16} color="#FFF" />}
          fill={true}
        />
      </View>
    </SafeAreaView>
  );
}
