import {
  Dimensions,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import ExerciseHeader from "@/src/components/ExerciseHeader";
import { useNavigationState } from "@react-navigation/native";

const categoriesMock = [
  {
    id: "balance-training",
    name: "Balance Training",
    total: "213",
    color: "#434343",
    image: require("@/assets/data/img/soft_mat__one-leg_stand_-_rocking_lateral_1_light.png"),
  },
  {
    id: "body-mechanics",
    name: "Body Mechanics",
    total: "402",
    color: "#9F4C61",
    image: require("@/assets/data/img/deep_squat_1_light.png"),
  },
  {
    id: "closed-chain",
    name: "Closed Chain",
    total: "402",
    color: "#5E8482",
    image: require("@/assets/data/img/push-up__medium_hands_1_light.png"),
  },
  {
    id: "completed-balance-and-vestibular",
    name: "Complete Balance and Vestibular",
    total: "397",
    color: "#426947",
    image: require("@/assets/data/img/leg_lift_1_light.png"),
  },
  {
    id: "stability-ball",
    name: "Stability Ball",
    total: "397",
    color: "#615AA8",
    image: require("@/assets/data/img/one-leg_hip_abduction__standing_1_light.png"),
  },
  {
    id: "strength-training",
    name: "Strength Training",
    total: "397",
    color: "#402E81",
    image: require("@/assets/data/img/bench_press__medium_grip_(barbell)_1_light.png"),
  },
  {
    id: "geriatric-strengthening",
    name: "Geriatric Strengthening",
    total: "397",
    color: "#80703D",
    image: require("@/assets/data/img/adduction__standing_-_stable_(active)_1_light.png"),
  },
  {
    id: "geriatric-resource-library",
    name: "Geriatric Resource Library",
    total: "397",
    color: "#A87E2F",
    image: require("@/assets/data/img/supine_push_1_light.png"),
  },
  {
    id: "orthopedic",
    name: "Orthopedic",
    total: "397",
    color: "#9B2C44",
    image: require("@/assets/data/img/straight_leg_raise_3_light.png"),
  },
  {
    id: "spinal-stabilization",
    name: "Spinal Stabilization",
    total: "397",
    color: "#533535",
    image: require("@/assets/data/img/the_hundred__intermediate_1_light.png"),
  },
];

const RoutineLibrary = () => {
  const screenWidth = Dimensions.get("window").width;
  const categoriesWidth = (screenWidth - 16 * 2 - 16) / 2; // 16 padding on each side, 2 on each row, 8 gap

  return (
    <ScrollView style={{ flex: 1 }}>
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
        {categoriesMock.map((item, index) => {
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
