import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

const ExerciseHeader = ({}: {}) => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />

      {/* Search bar */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            padding: 16,
            borderRadius: 9999,
            backgroundColor: "#FFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
