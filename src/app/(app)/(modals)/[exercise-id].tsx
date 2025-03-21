import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import exercises from "@/assets/data/exercises.json";
import { Exercise } from "@/src/types/utils";
import Colors from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Page = () => {
  const { id } = useLocalSearchParams();

  // Find the exercise
  const exercise = (exercises as Exercise[]).find(
    (item: Exercise) => item.id === id
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 16,
          padding: 16,
          backgroundColor: "#FFF",
        }}
      >
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Text
            style={{ fontSize: 24, fontFamily: "dm-sb", color: Colors.dark }}
          >
            {exercise?.name}
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "dm", color: Colors.grey2 }}>
            {exercise?.description}
          </Text>
        </View>

        {/* Should perfect this later */}
        <Image
          source={{ uri: exercise?.image_dark }}
          style={{
            width: "100%",
            aspectRatio: 16 / 10,
          }}
          resizeMode="contain"
        />

        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: Colors.faintGrey,
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={Colors.dark}
            />
            <Text
              style={{
                textTransform: "capitalize",
                fontFamily: "dm",
                fontSize: 16,
                color: Colors.dark,
              }}
            >
              {exercise?.category}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: Colors.faintGrey,
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={Colors.dark}
            />
            <Text
              style={{
                textTransform: "capitalize",
                fontFamily: "dm",
                fontSize: 16,
                color: Colors.dark,
              }}
            >
              Rehabilitation
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          paddingVertical: 16,
          paddingHorizontal: 16,
          flexDirection: "column",
          gap: 8,
          borderTopColor: Colors.faintGrey,
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors.dark,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: Colors.dark,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            backgroundColor: Colors.dark,
            borderColor: Colors.dark,
            borderRadius: 8,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: "#FFF",
            }}
          >
            Add to Routine Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
