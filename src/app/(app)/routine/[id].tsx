import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import Colors from "@/src/constants/Colors";
import Avatar from "@/src/components/Avatar";
import HoldToStartButton from "@/src/components/buttons/HoldToStartButton";
import * as Haptics from "expo-haptics";
import { useRoutineSession } from "@/src/contexts/RoutineSessionContext";
import uuid from "react-native-uuid";
import { useExercise } from "@/src/contexts/ExerciseContext";
import { Exercise } from "@/src/types/utils";
import { useRoutines } from "@/src/contexts/RoutinesContext";

const RoutinePage = () => {
  const { id } = useLocalSearchParams();
  const [routine, setRoutine] = useState<any>();
  const { setRoutineSession } = useRoutineSession();
  const [loading, setLoading] = useState(true);
  const { setExercise, setCanEdit } = useExercise();

  const handleOpen = (item: Exercise) => {
    setExercise(item);
    setCanEdit(false);
  };

  const handleDelete = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // Routine document location
      const routineRef = doc(db, "routines", id as string);
      await deleteDoc(routineRef);

      router.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRoutine = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "routines", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRoutine({ routineId: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such routine!");
        }
      } catch (error) {
        console.error("Failed to fetch routine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 16,
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
      }}
    >
      <Stack.Screen options={{ title: routine!.name || "Routine" }} />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            height: 200,
            backgroundColor: Colors.faintGrey,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.faintGrey,
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
      </View>

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Avatar
          size={40}
          uri={routine.assigner.image}
          initials={`${routine.assigner.firstName[0]}${routine.assigner.lastName[0]}`}
        />
        <Text style={{ fontFamily: "dm-sb", fontSize: 16 }}>
          {auth.currentUser?.uid === routine.assigner.id
            ? "Made by Me"
            : `Assigned by ${routine.assigner.firstName}`}{" "}
          •{" "}
          <Text style={{ fontFamily: "dm" }}>
            {" "}
            {routine.exercises.length}{" "}
            {routine.exercises.length === 1 ? "Exercise" : "Exercises"}
          </Text>
        </Text>
      </View>
      {/* Buttons to do stuff with the routine */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Edit button
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 8,
            backgroundColor: Colors.dark,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 9999,
          }}
        >
          <Text style={{ color: "#FFF", fontFamily: "dm-sb", fontSize: 12 }}>
            Edit
          </Text>
        </TouchableOpacity> */}

        {/* Delete button */}
        <HoldToStartButton
          text="Delete routine"
          baseColor={Colors.red}
          baseIcon={<></>}
          overlayIcon={<></>}
          onComplete={handleDelete}
        />

        {/* Start button */}
        <HoldToStartButton
          onComplete={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            setRoutineSession({
              sessionId: uuid.v4(), // So we can find the session later in local storage
              currentIndex: 0, // Current exercise we are on
              timeElapsed: 0, // Milliseconds
              startedAt: Timestamp.now(), // The date we start the session
              endedAt: null,
              completed: false, // User cannot complete the exercise immediately
              ...routine,
            });
            router.push(`/(app)/routine/active`);
          }}
        />
      </View>
      <FlatList
        data={routine.exercises}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
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
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RoutinePage;
