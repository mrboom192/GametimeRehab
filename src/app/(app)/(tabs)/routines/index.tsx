import {
  Dimensions,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import exercises from "@/assets/data/exercises.json";
import { Exercise } from "@/src/types/utils";

const categories = [
  {
    id: "balance-training",
    name: "Balance Training",
    color: "#434343",
    image: require("@/assets/images/exercises/soft_mat__one-leg_stand_-_rocking_lateral_1_light.png"),
  },
  {
    id: "body-mechanics",
    name: "Body Mechanics",
    color: "#9F4C61",
    image: require("@/assets/images/exercises/deep_squat_1_light.png"),
  },
  {
    id: "closed-chain",
    name: "Closed Chain",
    color: "#5E8482",
    image: require("@/assets/images/exercises/push-up__medium_hands_1_light.png"),
  },
  {
    id: "complete-balance-and-vestibular",
    name: "Complete Balance and Vestibular",
    color: "#426947",
    image: require("@/assets/images/exercises/leg_lift_1_light.png"),
  },
  {
    id: "stability-ball",
    name: "Stability Ball",
    color: "#615AA8",
    image: require("@/assets/images/exercises/one-leg_hip_abduction__standing_1_light.png"),
  },
  {
    id: "strength-training",
    name: "Strength Training",
    color: "#402E81",
    image: require("@/assets/images/exercises/bench_press__medium_grip_(barbell)_1_light.png"),
  },
  {
    id: "geriatric-strengthening",
    name: "Geriatric Strengthening",
    color: "#80703D",
    image: require("@/assets/images/exercises/adduction__standing_-_stable_(active)_1_light.png"),
  },
  {
    id: "geriatric-resource-library",
    name: "Geriatric Resource Library",
    color: "#A87E2F",
    image: require("@/assets/images/exercises/supine_push_1_light.png"),
  },
  {
    id: "orthopedic",
    name: "Orthopedic",
    color: "#9B2C44",
    image: require("@/assets/images/exercises/straight_leg_raise_3_light.png"),
  },
  {
    id: "spinal-stabilization",
    name: "Spinal Stabilization",
    color: "#533535",
    image: require("@/assets/images/exercises/the_hundred__intermediate_1_light.png"),
  },
];

const categoriesWithTotals = categories.map((category) => ({
  ...category,
  total: (exercises as Exercise[]).filter(
    (item: Exercise) =>
      item.category.trim().toLowerCase() === category.name.trim().toLowerCase()
  ).length,
}));

const RoutineLibrary = () => {
  const screenWidth = Dimensions.get("window").width;
  const categoriesWidth = (screenWidth - 16 * 2 - 16) / 2; // 16 padding on each side, 2 on each row, 8 gap

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{
          padding: 16,
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          paddingBottom: 128,
        }}
      >
        {categoriesWithTotals.map((item, index) => {
          return (
            <Link
              href={`/(app)/(tabs)/routines/${item.id}`}
              key={item.id}
              asChild
            >
              <TouchableOpacity
                style={{
                  width: categoriesWidth,
                  height: categoriesWidth,
                  backgroundColor: item.color,
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <ImageBackground
                  source={item.image}
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                  imageStyle={{ resizeMode: "contain", opacity: 0.5 }}
                >
                  <Text style={{ fontFamily: "dm-sb", color: "#FFF" }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontFamily: "dm", color: "#FFF" }}>
                    {item.total} items
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default RoutineLibrary;
