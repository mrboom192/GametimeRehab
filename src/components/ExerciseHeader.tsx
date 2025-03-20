import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useSegments } from "expo-router";

const ExerciseHeader = () => {
  const segments = useSegments();

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF" }}>
      <StatusBar style="dark" />
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: "row",
          gap: 16,
        }}
      >
        {/* Back Button */}
        {segments[segments.length - 1] !== "routines" && (
          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 9999,
              backgroundColor: "#FFF",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" color={Colors.dark} size={20} />
          </TouchableOpacity>
        )}

        {/* Search bar */}
        <View
          style={{
            padding: 16,
            borderRadius: 9999,
            flex: 1,
            backgroundColor: "#FFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ fontFamily: "dm-sb" }}>Search exercises</Text>
          <Ionicons name="search" color={Colors.dark} size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseHeader;
