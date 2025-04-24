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
import { useSearch } from "../contexts/SearchContext";
import { TextSemiBold } from "./StyledText";

const ExerciseHeader = () => {
  const segments = useSegments();
  const { cart } = useCart(); // Access the cart state
  const { searchQuery, setSearchQuery } = useSearch();

  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF" }}>
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

        {/* Search Button */}
        <Link href={"/search"} asChild>
          <TouchableOpacity
            style={{
              borderRadius: 9999,
              flex: 1,
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
            <TextSemiBold
              style={{
                padding: 16,
                fontFamily: "dm-sb",
              }}
            >
              Search Exercises
            </TextSemiBold>
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
    </SafeAreaView>
  );
};

export default ExerciseHeader;
