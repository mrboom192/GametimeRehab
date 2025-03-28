import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

const AddToRoutine = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.yellow,
        padding: 16,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 16,
        flex: 1,
      }}
    >
      {/* Widget Header */}
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Entypo name="plus" size={20} color={Colors.dark} />
        <Text
          style={{
            color: Colors.dark,
            fontFamily: "dm-sb",
            fontSize: 16,
          }}
        >
          Add to routine
        </Text>
      </View>

      {/* Message */}
      <Text
        style={{
          color: Colors.dark,
          fontFamily: "dm",
          fontSize: 16,
        }}
      >
        Create new routine now!
      </Text>

      {/* Button */}
      <Link href={"/(app)/(tabs)/routines"} asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.dark,
              fontFamily: "dm-sb",
              fontSize: 16,
            }}
          >
            Browse
          </Text>
          <Feather name="chevron-right" size={20} color={Colors.dark} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default AddToRoutine;
