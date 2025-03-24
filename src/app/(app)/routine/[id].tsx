import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";

const RoutinePage = () => {
  const { id } = useLocalSearchParams();
  const [routine, setRoutine] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const fetchRoutine = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "routines", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRoutine({ id: docSnap.id, ...docSnap.data() });
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
      <Text style={{ fontFamily: "dm-sb" }}>
        {auth.currentUser?.uid === routine.assigner
          ? "Made by Me"
          : `Assigned by ${routine.assigner}`}{" "}
        •{" "}
        <Text style={{ fontFamily: "dm" }}>
          {" "}
          {routine.exercises.length}{" "}
          {routine.exercises.length === 1 ? "Exercise" : "Exercises"}
        </Text>
      </Text>
      <FlatList
        data={routine.exercises}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        // style={{ flex: 1 }}
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
                  <Link
                    href={{
                      pathname: "/(app)/(modals)/[exercise-id]",
                      params: { id: item.id },
                    }}
                    asChild
                  >
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
