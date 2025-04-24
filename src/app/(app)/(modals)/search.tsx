import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { TextSemiBold } from "@/src/components/StyledText";
import ExerciseList from "@/src/components/ExerciseList";
import { Exercise } from "@/src/types/utils";
import { useCart } from "@/src/contexts/CartContext";
import { useExercise } from "@/src/contexts/ExerciseContext";
import exercises from "@/assets/data/exercises.json";

const ITEMS_PER_PAGE = 8;

export default function SearchModal() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const { cart, setCart } = useCart();
  const { setExercise, setCanEdit } = useExercise();

  // Filter exercises based on search query
  const filteredExercises = useMemo(() => {
    return (exercises as Exercise[]).filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [searchQuery]);

  // Initial + paginated loading
  useEffect(() => {
    setPage(1);
    setExerciseList(filteredExercises.slice(0, ITEMS_PER_PAGE));
  }, [filteredExercises]);

  const loadMoreExercises = () => {
    if (exerciseList.length >= filteredExercises.length) return;

    const nextPage = page + 1;
    const newExercises = filteredExercises.slice(0, nextPage * ITEMS_PER_PAGE);
    setExerciseList(newExercises);
    setPage(nextPage);
  };

  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAdd = (item: Exercise) => {
    setCart((prev) => ({
      ...prev,
      exercises: [...prev.exercises, item],
    }));
  };

  const handleRemove = (item: Exercise) => {
    setCart((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((cartItem) => cartItem.id !== item.id),
    }));
  };

  const handleOpen = (item: Exercise) => {
    setExercise(item);
    setCanEdit(true);
    router.push("/(app)/(modals)/exercise");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Search Exercises",
          animation: "fade",
          animationDuration: 125,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#FFF" },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Search bar */}
      <View style={styles.searchBar}>
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
          onChangeText={updateSearch}
          style={styles.searchInput}
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
        ) : null}
      </View>

      <ExerciseList
        data={exerciseList}
        onEndReached={loadMoreExercises}
        cart={cart.exercises}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onOpen={handleOpen}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <TextSemiBold style={styles.emptyText}>
              {searchQuery.length > 0
                ? "No exercises found"
                : "Start typing to search exercises"}
            </TextSemiBold>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  searchBar: {
    borderRadius: 9999,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    padding: 16,
    fontFamily: "dm-sb",
    flex: 1,
    fontSize: 16,
    color: Colors.dark,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    color: Colors.grey2,
    fontSize: 16,
  },
});
