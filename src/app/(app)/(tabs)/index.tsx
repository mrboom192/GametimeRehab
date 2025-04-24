import React, { ReactElement, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useUser } from "../../../contexts/UserContext"; // Import UserContext
import { Stack, useFocusEffect } from "expo-router";
import Header from "@/src/components/Header";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import Progress from "@/src/components/widgets/Progress";
import AddToRoutine from "@/src/components/widgets/AddToRoutine";
import Streak from "@/src/components/widgets/Streak";
import Trophy from "@/src/components/widgets/Trophy";
import TrainerProgress from "@/src/components/widgets/TrainerProgress";
import QuickUpdates from "@/src/components/widgets/QuickUpdates";
import { ScreenTransition } from "@/src/components/ScreenTransition";
import { TextSemiBold } from "@/src/components/StyledText";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";

const trophiesMock = [
  {
    name: "Stronger than ever",
    image: require("@/assets/images/trophies/stronger-than-ever.png"),
    color: "#E83C00",
  },
  {
    name: "Stat Sheet Champ",
    image: require("@/assets/images/trophies/stat-sheet-champ-2.png"),
    color: "#4855B7",
  },
  {
    name: "Stronger than ever",
    image: require("@/assets/images/trophies/stronger-than-ever-2.png"),
    color: "#636978",
  },
  {
    name: "Health is Wealth",
    image: require("@/assets/images/trophies/water-bottle.png"),
    color: "#4855B7",
  },
  {
    name: "Stat Sheet Champ",
    image: require("@/assets/images/trophies/stat-sheet-champ.png"),
    color: "#3389FF",
  },
  {
    name: "Stronger than ever",
    image: require("@/assets/images/trophies/stronger-than-ever-2.png"),
    color: "#636978",
  },
  {
    name: "Stat Sheet Champ",
    image: require("@/assets/images/trophies/stat-sheet-champ-2.png"),
    color: "#4855B7",
  },
  {
    name: "Full Trophy Case",
    image: require("@/assets/images/trophies/trophy-case.png"),
    color: "#27488F",
  },
];

const athleteTabs = ["Progress", "Trophies", "Upcoming"];
const trainerTabs = ["Progress", "Roster", "Upcoming"];

export default function Index() {
  const { data, loading, initializing } = useUser(); // Assume useUser provides a loading state
  const [tab, setTab] = useState("Progress");
  const [isForward, setIsForward] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const trophyWidth = (screenWidth - 16 * 2 - 8) / 2;

  // Magical status bar
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("light");

      return () => {
        setStatusBarStyle("dark");
      };
    }, [])
  );

  if (loading || initializing) {
    return (
      <View
        style={{
          flex: 1,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      </View>
    );
  }

  const tabs = data?.type === "athlete" ? athleteTabs : trainerTabs;

  const onTabChange = (newTab: string) => {
    if (newTab === tab) return; // No-op if you're already on that tab

    const oldIndex = tabs.findIndex((t) => t === tab);
    const newIndex = tabs.findIndex((t) => t === newTab);

    // Calculate forward vs. backward using these stable indices
    const goingForward = newIndex > oldIndex;

    setIsForward(goingForward);
    setTab(newTab);
  };

  const tabComponents: Record<string, ReactElement> = {
    Progress: (
      <View style={{ padding: 16, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            gap: 16,
            width: "100%",
            paddingBottom: 80,
          }}
        >
          <View style={{ flex: 1 }}>
            {data?.type === "athlete" ? (
              <Progress
                currentDate={new Date()}
                recoveryDate={new Date(2025, 4, 15)}
                startDate={new Date()}
              />
            ) : (
              <TrainerProgress
                currentDate={new Date()}
                recoveryDate={new Date(2025, 4, 15)}
                startDate={new Date()}
                data={data}
              />
            )}
          </View>

          <View style={{ flex: 1, flexDirection: "column", gap: 16 }}>
            {data?.type === "athlete" ? (
              <>
                <AddToRoutine />
                <Streak />
              </>
            ) : (
              <QuickUpdates />
            )}
          </View>
        </View>
      </View>
    ),
    Trophies: (
      <View
        style={{
          padding: 16,
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {trophiesMock.map((item, index) => {
          return (
            <View key={index} style={{ width: trophyWidth }}>
              <Trophy name={item.name} image={item.image} color={item.color} />
            </View>
          );
        })}
      </View>
    ),
    Upcoming: (
      <View style={{ padding: 16 }}>
        <TextSemiBold>Upcoming View</TextSemiBold>
      </View>
    ),
    Roster: (
      <View style={{ padding: 16 }}>
        <TextSemiBold>Roster View</TextSemiBold>
      </View>
    ),
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <Stack.Screen
        options={{
          header: () => <Header onTabChange={onTabChange} tabs={tabs} />,
        }}
      />
      <ScreenTransition
        key={tab}
        direction={isForward ? "Forward" : "Backward"}
        style={{ flex: 1 }}
      >
        {tabComponents[tab] || <Text>Tab not found</Text>}
      </ScreenTransition>
    </SafeAreaView>
  );
}
