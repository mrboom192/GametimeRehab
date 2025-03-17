import React, { ReactElement, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useUser } from "../../../contexts/UserContext"; // Import UserContext
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";
import Header from "@/src/components/Header";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import Progress from "@/src/components/widgets/Progress";
import AddToRoutine from "@/src/components/widgets/AddToRoutine";
import Streak from "@/src/components/widgets/Streak";
import Trophy from "@/src/components/widgets/Trophy";

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

const tabs = ["Progress", "Trophies", "Upcoming"];

export default function Index() {
  const { userInfo, loading, initializing } = useUser(); // Assume useUser provides a loading state
  const [tab, setTab] = useState("Progress");
  const [isForward, setIsForward] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const trophyWidth = (screenWidth - 16 * 2 - 8) / 2;

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
            gap: 16,
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <Progress
              currentDate={new Date()}
              recoveryDate={new Date(2025, 4, 15)}
              startDate={new Date()}
            />
          </View>

          <View style={{ flex: 1, flexDirection: "column", gap: 16 }}>
            <AddToRoutine />
            <Streak />
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
        <Text>Upcoming View</Text>
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
      <Animated.View
        key={tab}
        entering={isForward ? FadeInRight : FadeInLeft}
        // exiting={isForward ? FadeOutLeft : FadeOutRight}
        style={styles.animatedContainer}
      >
        {tabComponents[tab] || <Text>Tab not found</Text>}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
});
