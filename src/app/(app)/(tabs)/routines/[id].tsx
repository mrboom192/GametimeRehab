import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import exercises from "@/assets/data/exercises.json";

const ITEMS_PER_PAGE = 15;

const Search = () => {
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const { id } = useLocalSearchParams();
  const formattedId = id
    .toString()
    .split("-")
    .map((word) =>
      word.toLowerCase() === "and"
        ? "and"
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

  const filteredExercises = exercises.filter(
    (exercise: any) =>
      exercise.category.toLowerCase() === formattedId.toLowerCase()
  );

  // Load more exercises
  const loadMoreExercises = () => {
    if (exerciseList.length >= filteredExercises.length) return; // Stop if all are loaded

    const nextPage = page + 1;
    const newExercises = filteredExercises.slice(0, nextPage * ITEMS_PER_PAGE);
    setExerciseList(newExercises);
    setPage(nextPage);
  };

  // Initial loading
  useEffect(() => {
    setExerciseList(filteredExercises.slice(0, ITEMS_PER_PAGE));
  }, [id]); // Reload when id changes

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#FFF" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        {formattedId}
      </Text>

      {filteredExercises.length === 0 ? (
        <Text style={styles.noResults}>No exercises found.</Text>
      ) : (
        <FlatList
          data={exerciseList}
          keyExtractor={(item) => item.description}
          onEndReached={loadMoreExercises}
          onEndReachedThreshold={0}
          renderItem={({ item }) => (
            <View
              style={{
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: item.image_dark,
                }}
                style={{
                  width: 80,
                  height: 80,
                  marginRight: 12,
                  borderRadius: 10,
                }}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Link href={"/(app)/(modals)/exercise-details"} asChild>
                  <TouchableOpacity>
                    <Text>Details</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noResults: {
    fontSize: 16,
    color: "gray",
  },
  textContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});

export default Search;
