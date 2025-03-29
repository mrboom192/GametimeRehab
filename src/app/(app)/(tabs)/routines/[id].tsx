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
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { useExercise } from "@/src/contexts/ExerciseContext";

const ITEMS_PER_PAGE = 8;

const Search = () => {
  const { id } = useLocalSearchParams();
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const { setExercise } = useExercise();
  const [routines, setRoutines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    setCart((old) => [...old, item]);
  };

  const handleRemove = (item: Exercise) => {
    setCart((old) => old.filter((cartItem) => cartItem.id !== item.id));
  };

  const handleOpen = (item: Exercise) => {
    setExercise(item);
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      try {
        const q = query(
          collection(db, "routines"),
          where("assigneeIds", "array-contains", uid)
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];

        setRoutines(docs);
      } catch (error) {
        console.error("Failed to fetch routines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  // Initial loading
  useEffect(() => {
    setExerciseList(filteredExercises.slice(0, ITEMS_PER_PAGE));
  }, [id]); // Reload when id changes

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
          {loading ? (
            <Text>Loading...</Text>
          ) : routines.length === 0 ? (
            <Text>No routines yet.</Text>
          ) : (
            routines.map((routine) => (
              <Link
                href={{
                  pathname: "/(app)/routine/[id]",
                  params: { id: routine.id },
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
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreExercises}
          onEndReachedThreshold={0}
          style={{ flex: 1 }}
          contentContainerStyle={{ marginHorizontal: 16, paddingBottom: 100 }}
          renderItem={({ item }) => {
            const isInCart = cart.some((cartItem) => cartItem.id === item.id);
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
                {/* The exercise image */}
                <Image
                  source={{
                    uri: item.image_dark,
                  }}
                  style={{
                    width: 96,
                    height: 96,
                    marginRight: 16,
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "dm-sb",
                        marginBottom: 4,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.grey2,
                      }}
                    >
                      {item.tags[0]
                        ?.split(" ")
                        .map(
                          (word: string) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Link href="/(app)/(modals)/exercise" asChild>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderColor: Colors.grey2,
                          borderRadius: 9999,
                        }}
                        onPress={() => handleOpen(item)}
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
                        justifyContent: "center",
                        backgroundColor: isInCart ? Colors.green : Colors.dark,
                        borderWidth: 1,
                        borderColor: isInCart ? Colors.green : Colors.dark,
                        borderRadius: 9999,
                      }}
                      onPress={() =>
                        isInCart ? handleRemove(item) : handleAdd(item)
                      }
                    >
                      <Text
                        style={{
                          fontFamily: "dm-sb",
                          fontSize: 12,
                          color: "#FFF",
                        }}
                      >
                        {isInCart ? "Added" : "Add"}
                      </Text>
                      {isInCart ? (
                        <Ionicons name="checkmark" size={16} color={"#FFF"} />
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Search;
