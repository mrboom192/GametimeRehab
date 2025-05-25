import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import exercises from "@/assets/data/exercises.json";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/contexts/CartContext";
import { Exercise } from "@/src/types/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSearch } from "@/src/contexts/SearchContext";
import { useExercise } from "@/src/contexts/ExerciseContext";
import { useRoutines } from "@/src/contexts/RoutinesContext";
import ExerciseList from "@/src/components/ExerciseList";

const ITEMS_PER_PAGE = 8;

const Search = () => {
  const { id } = useLocalSearchParams();
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const { setExercise, setCanEdit } = useExercise();
  const { routines, loading } = useRoutines();
  const { searchQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { cart, setCart } = useCart();
  const formattedId = id
    .toString()
    .split("-")
    .map((word) =>
      word.toLowerCase() === "and"
        ? "and"
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

  const filteredExercises = useMemo(() => {
    return (exercises as Exercise[]).filter(
      (exercise: Exercise) =>
        exercise.category.toLowerCase() === formattedId.toLowerCase() &&
        exercise.name
          .toLowerCase()
          .includes(searchQuery.replace(/\s+/g, " ").trim().toLowerCase()) // Super basic
    );
  }, [formattedId, searchQuery]);

  // Load more exercises
  const loadMoreExercises = () => {
    if (exerciseList.length >= filteredExercises.length) return; // Stop if all are loaded

    const nextPage = page + 1;
    const newExercises = filteredExercises.slice(0, nextPage * ITEMS_PER_PAGE);
    setExerciseList(newExercises);
    setPage(nextPage);
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
  };

  // Initial loading
  useEffect(() => {
    setExerciseList(filteredExercises.slice(0, ITEMS_PER_PAGE));
  }, [id]); // Reload when id changes

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "dm-sb",
          marginBottom: 16,
          marginHorizontal: 16,
        }}
      >
        Routines
      </Text>

      <View>
        <ScrollView
          horizontal
          style={{ marginBottom: 16 }}
          contentContainerStyle={{ paddingLeft: 16 }}
        >
          {routines.length === 0 ? (
            <Text>No routines yet.</Text>
          ) : (
            routines.map((routine) => (
              <Link
                href={{
                  pathname: "/(app)/routine/[id]",
                  params: { id: routine.id as string },
                }}
                key={routine.id}
                asChild
              >
                <TouchableOpacity
                  style={{
                    marginRight: 8,
                    flexDirection: "column",
                    gap: 8,
                    width: 100,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      height: 100,
                      backgroundColor: Colors.faintGrey,
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    {routine.image ? (
                      <Image
                        source={{ uri: routine.image }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text
                        style={{
                          fontFamily: "dm-sb",
                          color: Colors.grey,
                          marginHorizontal: 8,
                          textAlign: "center",
                        }}
                      >
                        {routine.name}
                      </Text>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontFamily: "dm-sb", fontSize: 12 }}
                  >
                    {routine.name}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))
          )}
        </ScrollView>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontFamily: "dm-sb",
          marginBottom: 16,
          marginHorizontal: 16,
        }}
      >
        {formattedId}
      </Text>

      {filteredExercises.length === 0 ? (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "dm",
            color: "gray",
            marginLeft: 16,
          }}
        >
          No exercises found for{" "}
          <Text style={{ fontFamily: "dm-sb" }}>"{searchQuery}"</Text>.
        </Text>
      ) : (
        <ExerciseList
          data={exerciseList}
          onEndReached={loadMoreExercises}
          cart={cart.exercises}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onOpen={handleOpen}
        />
      )}
    </View>
  );
};

export default Search;
