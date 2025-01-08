import {
  View,
  Text,
  Button,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from "react-native";
import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Stack } from "expo-router";
import GraphArrowIncrease from "@/src/components/icons/GraphArrowIncrease";
import SummaryCard from "@/src/components/SummaryCard";
import AchievementsCard from "@/src/components/AchievementsCard";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] =
    useState<FirebaseFirestoreTypes.DocumentData | null>();
  const [error, setError] = useState<string | null>(null);
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      getUserInfo();
    }
  }, [user]);

  const getUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const userDoc = await firestore()
        .collection("users")
        .doc(user?.uid)
        .get();

      if (userDoc.exists) {
        setUserInfo(userDoc.data());
      } else {
        setUserInfo(null);
        setError("No user information found.");
      }
    } catch (e: any) {
      console.error("Error retrieving user information:", e.message);
      setError("Error retrieving user information.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size={"small"} style={{ margin: 28 }} />;
  }

  return (
    <SafeAreaView className="flex-1 flex-col bg-white p-5 gap-4">
      <View className="absolute -top-[45%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FEF5EF] rounded-full" />

      <Stack.Screen
        options={{
          statusBarStyle: "dark",
          statusBarBackgroundColor: "#FEF5EF",
          headerStyle: {
            backgroundColor: "#FEF5EF",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => <Ionicons name="menu" size={32} />,
          headerTitle: (props) => (
            <Text className="text-[#F1744D] font-medium text-4xl">
              gametime
            </Text>
          ),
          headerRight: () => (
            <View className="w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
              <Text className="text-xl text-white">
                {userInfo?.firstName[0]}
              </Text>
            </View>
          ),
        }}
      />
      <View className="flex flex-row justify-between items-center">
        <Text
          className="text-3xl flex-1 truncate text-[#2C2C2C] font-medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {userInfo?.firstName || "User"}'s Dashboard
        </Text>
      </View>

      <View className="flex flex-row self-stretch gap-5 justify-center">
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
      </View>

      <View className="flex justify-between items-end">
        <Link href="/progress" asChild>
          <Pressable
            className="flex-row items-center bg-[#2C2C2C] gap-2 p-2.5 rounded-lg hover:bg-zinc-700 active:bg-zinc-600 focus:ring focus:ring-zinc-500"
            accessibilityRole="button"
            accessibilityLabel="View Progress"
          >
            <Text className="text-white font-medium text-xs">
              View Progress
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </Pressable>
        </Link>
      </View>
      <Text className="text-[#2C2C2C] text-[32px] font-medium">
        Today's Focus
      </Text>
      <Text className="text-[#2C2C2C]">Assigned</Text>
      <Text className="text-[#2C2C2C]">Scheduled</Text>
      <AchievementsCard />
      <Button title="Sign out" onPress={() => auth().signOut()} />

      <View className="flex justify-between items-end">
        <Link href="/assigned-exercises" asChild>
          <Pressable
            className="flex-row items-center bg-[#2C2C2C] gap-2 p-2.5 rounded-lg hover:bg-zinc-700 active:bg-zinc-600 focus:ring focus:ring-zinc-500"
            accessibilityRole="button"
            accessibilityLabel="View Progress"
          >
            <Text className="text-white font-medium text-xs">
              Assigned Exercieses
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
