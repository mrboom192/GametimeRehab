import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import exercises from "@/assets/data/exercises.json";
import { Exercise } from "@/src/types/utils";
import Colors from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "@/src/contexts/CartContext";
import * as Haptics from "expo-haptics";
import { useExercise } from "@/src/contexts/ExerciseContext";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { cart, setCart } = useCart();
  const { exercise, setExercise, canEdit } = useExercise();

  if (!exercise) {
    return <Text>Loading...</Text>;
  }

  const handleAdd = async (item: Exercise) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCart((old) => [...old, item]);
  };

  const handleRemove = async (item: Exercise) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCart((old) => old.filter((cartItem) => cartItem.id !== item.id));
  };

  const isInCart = cart.some((cartItem) => cartItem.id === exercise.id);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 16,
          backgroundColor: "#FFF",
        }}
      >
        <View style={{ flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <Text
            style={{ fontSize: 24, fontFamily: "dm-sb", color: Colors.dark }}
          >
            {exercise?.name}
          </Text>
          <TextInput
            value={exercise.description}
            onChangeText={(value) =>
              setExercise((old: any) => ({ ...old, description: value }))
            }
            style={{
              fontSize: 16,
              fontFamily: "dm",
              color: Colors.grey2,
            }}
            multiline
            editable={canEdit}
          />
        </View>

        {/* Should perfect this later */}
        <Image
          source={{ uri: exercise?.image_dark }}
          style={{
            width: "100%",
            aspectRatio: 16 / 10,
            marginBottom: 16,
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
      {canEdit && (
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
          {/* <TouchableOpacity
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
        </TouchableOpacity> */}

          <TouchableOpacity
            style={{
              paddingVertical: 16,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              backgroundColor: isInCart ? Colors.red : Colors.dark,
              borderColor: isInCart ? Colors.red : Colors.dark,
              borderRadius: 8,
              marginBottom: 32,
            }}
            onPress={() =>
              isInCart ? handleRemove(exercise) : handleAdd(exercise)
            }
          >
            <Text
              style={{
                fontFamily: "dm-sb",
                fontSize: 16,
                color: "#FFF",
              }}
            >
              {isInCart ? "Remove from Cart" : "Add to Routine Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Page;
