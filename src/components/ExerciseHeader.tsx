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
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router, useSegments } from "expo-router";
import { useCart } from "../contexts/CartContext";
import { useSearch } from "../contexts/SearchContext";

const ExerciseHeader = () => {
  const segments = useSegments();
  const { cart } = useCart(); // Access the cart state
  const { searchQuery, setSearchQuery } = useSearch();

  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

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
          <Ionicons
            name="search"
            color={Colors.grey2}
            size={20}
            style={{ marginLeft: 16 }}
          />
          <TextInput
            placeholder="Search exercises"
            placeholderTextColor={Colors.grey2}
            value={searchQuery}
            onChangeText={(text) => updateSearch(text)}
            style={{
              padding: 16,
              fontFamily: "dm-sb",
              flex: 1,
            }}
          />
          {searchQuery ? (
            <Pressable onPress={() => updateSearch("")}>
              <Ionicons
                name="close"
                color={Colors.dark}
                size={20}
                style={{ marginRight: 16 }}
              />
            </Pressable>
          ) : (
            <></>
          )}
        </View>

        {/* Cart Button */}
        {cart.length > 0 && (
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
                {cart.length}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ExerciseHeader;
