import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router, usePathname, useSegments } from "expo-router";
import { useCart } from "../contexts/CartContext";
import { TextSemiBold } from "./StyledText";

const ExerciseHeader = () => {
  const segments = useSegments();
  const { cart } = useCart(); // Access the cart state

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF" }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {segments[segments.length - 1] !== "routines" ? (
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
        ) : (
          <View />
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 16,
          }}
        >
          {/* Search Button */}
          <Link href={"/search"} asChild>
            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 9999,
                backgroundColor: "#FFF",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Ionicons name="search-outline" size={20} color={Colors.dark} />
            </TouchableOpacity>
          </Link>

          {/* Cart Button */}
          {cart.exercises.length > 0 && (
            <Link href="/(app)/(modals)/cart" asChild>
              <TouchableOpacity
                style={{
                  padding: 16,
                  borderRadius: 9999,
                  backgroundColor: Colors.green,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    height: 20,
                    width: 20,
                    textAlign: "center",
                    fontFamily: "dm-sb",
                    color: "#FFF",
                  }}
                >
                  {cart.exercises.length}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseHeader;
