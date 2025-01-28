import { View, Text, Button, SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AchievementsCard from "@/src/components/AchievementsCard";
import { useUser } from "@/src/contexts/UserContext";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import AthleteDashboard from "@/src/components/AthleteDashboard";
import TrainerAthletes from "../TrainerAthletes";
import PairForm from "../PairForm";
import PendingAthleteRequests from "../PendingPairRequests";
import { useSession } from "@/src/contexts/AuthContext";

export default function Home() {
  const { signOut } = useSession();
  const { userInfo } = useUser();

  return (
    <SafeAreaView className="flex-1 flex-col bg-white p-5 gap-4">
      <View className="absolute -top-[45%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FBF7F5] rounded-full" />

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

      {userInfo?.type === "athlete" ? (
        <>
          <PairForm />
        </>
      ) : (
        <></>
      )}

      {/* Progress button */}
      <View className="flex justify-between items-end">
        <NavigateButton
          href="/progress"
          title="view progress"
          rightIcon={<Ionicons name="chevron-forward" size={16} color="#FFF" />}
          theme="dark"
        />
      </View>
      <AchievementsCard />
      <Button title="Sign out" onPress={() => signOut()} />

      {/* Exercises button */}
      <View className="flex justify-between items-end">
        <NavigateButton
          href="/routines/assigned"
          title="exercises"
          rightIcon={<Ionicons name="chevron-forward" size={16} color="#FFF" />}
          theme="dark"
        />
      </View>
    </SafeAreaView>
  );
}
