import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useUser } from "../../../contexts/UserContext"; // Import UserContext
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import AchievementsCard from "@/src/components/AchievementsCard";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import AthleteDashboard from "@/src/components/AthleteDashboard";
import TrainerAthletes from "@/src/components/TrainerAthletes";
import PendingAthleteRequests from "@/src/components/PendingPairRequests";
import athleteBackground from "../../../assets/images/athletebackground1.png";

export default function Index() {
  const { userInfo, loading, initializing } = useUser(); // Assume useUser provides a loading state

  if (loading || initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          // headerTitle: () => (
          //   <Text className="text-[#F1744D] font-medium text-4xl">
          //     gametime
          //   </Text>
          // ),
          headerRight: () => {
            return (
              <View className="w-10 h-10 mr-4 rounded-full bg-[#fff] flex items-center justify-center">
                <Text className="text-xl text-black">
                  {userInfo?.first_name?.[0] || "?"}
                </Text>
              </View>
            );
          },

          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <View className="flex-1 flex-col p-5 gap-4">
        <Text>Athlete View</Text>
        <AthleteDashboard firstName={userInfo?.first_name} />

        {userInfo?.type === "trainer" ? (
          <>
            <Text>Trainer code: {userInfo.trainer_code}</Text>
            <TrainerAthletes trainerUid={userInfo.uid} />
            <PendingAthleteRequests trainerUid={userInfo.uid} />
          </>
        ) : (
          <></>
        )}
        {/* Progress button */}
        <View className="flex justify-between items-end">
          <NavigateButton
            href="/progress"
            title="view progress"
            rightIcon={
              <Ionicons name="chevron-forward" size={16} color="#FFF" />
            }
            theme="dark"
          />
        </View>
        <AchievementsCard />

        {/* Exercises button */}
        <View className="flex justify-between items-end">
          <NavigateButton
            href="/routines/assigned"
            title="exercises"
            rightIcon={
              <Ionicons name="chevron-forward" size={16} color="#FFF" />
            }
            theme="dark"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
