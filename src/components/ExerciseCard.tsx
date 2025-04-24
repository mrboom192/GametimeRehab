import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Exercise } from "@/src/types/utils";
import Colors from "@/src/constants/Colors";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  item: Exercise;
  isInCart: boolean;
  onAdd: (item: Exercise) => void;
  onRemove: (item: Exercise) => void;
  onOpen: (item: Exercise) => void;
};

const ExerciseCard = ({ item, isInCart, onAdd, onRemove, onOpen }: Props) => {
  return (
    <View
      style={{
        borderRadius: 16,
        padding: 16,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: Colors.faintGrey,
      }}
    >
      <Image
        source={{ uri: item.image_dark }}
        style={{ width: 96, height: 96, marginRight: 16 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Text
            style={{ fontSize: 16, fontFamily: "dm-sb", marginBottom: 4 }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, color: Colors.grey2 }}>
            {item.tags[0]
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}
        >
          <Link href="/(app)/(modals)/exercise" asChild>
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: Colors.grey2,
                borderRadius: 9999,
              }}
              onPress={() => onOpen(item)}
            >
              <Text
                style={{
                  fontFamily: "dm-sb",
                  fontSize: 12,
                  color: Colors.grey2,
                }}
              >
                Details
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              backgroundColor: isInCart ? Colors.green : Colors.dark,
              borderWidth: 1,
              borderColor: isInCart ? Colors.green : Colors.dark,
              borderRadius: 9999,
            }}
            onPress={() => (isInCart ? onRemove(item) : onAdd(item))}
          >
            <Text style={{ fontFamily: "dm-sb", fontSize: 12, color: "#FFF" }}>
              {isInCart ? "Added" : "Add"}
            </Text>
            {isInCart && <Ionicons name="checkmark" size={16} color="#FFF" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExerciseCard;
