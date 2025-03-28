import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AchievementsCard from "@/src/components/AchievementsCard";
import { useUser } from "@/src/contexts/UserContext";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import AthleteDashboard from "@/src/components/AthleteDashboard";
import TrainerAthletes from "../TrainerAthletes";
import PendingAthleteRequests from "../PendingPairRequests";

export default function Home() {
  const { data } = useUser();

  return (
    <SafeAreaView className="flex-1 ">
      {/* <View className="absolute -top-[45%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FBF7F5] rounded-full" /> */}

      <View className="flex-1 flex-col p-5 gap-4">
        <Text>Athlete View</Text>
        <AthleteDashboard firstName={data?.first_name} />

        {data?.type === "trainer" ? (
          <>
            <Text>Trainer code: {data.trainer_code}</Text>
            <TrainerAthletes trainerUid={data.uid} />
            <PendingAthleteRequests trainerUid={data.uid} />
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
