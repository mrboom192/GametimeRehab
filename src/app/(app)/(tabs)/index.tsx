import React, { ReactElement, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useUser } from "../../../contexts/UserContext"; // Import UserContext
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import athleteBackground from "../../../assets/images/athletebackground1.png";
import Colors from "@/src/constants/Colors";
import Header from "@/src/components/AthleteHeader";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

const tabs = ["Progress", "Trophies", "Upcoming"];

export default function Index() {
  const { userInfo, loading, initializing } = useUser(); // Assume useUser provides a loading state
  const [tab, setTab] = useState("Progress");
  const [prevTab, setPrevTab] = useState("Progress");
  const [isForward, setIsForward] = useState(false);

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
    setPrevTab(tab);
    setTab(newTab);
  };

  const tabComponents: Record<string, ReactElement> = {
    Progress: (
      <View style={{ padding: 16 }}>
        <Text>Progress View</Text>
      </View>
    ),
    Trophies: (
      <View style={{ padding: 16 }}>
        <Text>Trophies View</Text>
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
