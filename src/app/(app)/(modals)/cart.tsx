import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useCart } from "@/src/contexts/CartContext";
import Colors from "@/src/constants/Colors";
import { Exercise, Routine } from "@/src/types/utils";
import { Link, router } from "expo-router";
import { auth, db, storage } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";
import { useUser } from "@/src/contexts/UserContext";
import { useExercise } from "@/src/contexts/ExerciseContext";
import { useRoutines } from "@/src/contexts/RoutinesContext";

const Page = () => {
  const { cart, setCart } = useCart();
  const [image, setImage] = useState<string | null>(null);
  const { setExercise, setCanEdit } = useExercise();
  const [routineName, setRoutineName] = useState("My Routine");
  const [isUploading, setIsUploading] = useState(false);
  const { data } = useUser();

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.01,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      // Resize & compress image
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 200, height: 200 } }], // Resize image
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(manipulated.uri); // Resized image
    }
  };

  async function createRoutine() {
    setIsUploading(true); // Make sure user cant double tap create routine button

    let uploadedImageURL: string | null = null;

    // Upload image if exists
    if (image) {
      const fileRef = ref(storage, `routine-covers/${uuid.v4()}.jpg`);

      const blob: Blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      try {
        await uploadBytes(fileRef, blob);
      } catch (error) {
        console.error("uploadBytes failed:", error);
      }

      // Clean up blob (optional chaining for safety)
      // @ts-ignore
      blob.close?.();

      uploadedImageURL = await getDownloadURL(fileRef);
    }

    const currentUser = {
      uid: auth.currentUser?.uid,
      firstName: data.first_name,
      lastName: data.last_name,
      image: data.image,
    };

    const newRoutine: Routine = {
      assigneeIds: cart.assigneeIds,
      assignees: cart.assignees, // An array of people assigned to the routine
      assigner: currentUser, // Can only have 1 person assigning
      assignerId: currentUser.uid as string, // Can only have 1 person assigning
      image: uploadedImageURL as string,
      name: routineName,
      exercises: [...cart.exercises],
      createdAt: serverTimestamp(),
    };

    // User creates their own routine in firebase
    await addDoc(collection(db, "routines"), newRoutine);

    if (data.type === "trainer" && cart.assignees.length !== 0) {
      const assignId = uuid.v4();

      const activityRef = doc(db, `activities/${assignId}`);

      // Only trainer can assign like this
      const newAssignActivty: any = {
        type: "assign",
        actor: currentUser,
        actorId: currentUser.uid as string,
        assignees: cart.assignees,
        assigneeIds: cart.assigneeIds,

        // Metadata
        createdAt: serverTimestamp(),

        // Stuff below related to assign
        routineName: routineName,
      };

      await setDoc(activityRef, newAssignActivty);
    }

    setCart({
      exercises: [],
      routineName: "",
      assignees: [],
      assigneeIds: [],
    });
    router.back();
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
      <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 128,
            height: 128,
            backgroundColor: Colors.faintGrey,
            borderRadius: 8,

            overflow: "hidden",
          }}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
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
              Pick a cover image
            </Text>
          )}
        </Pressable>
        <View style={{ flexDirection: "column", gap: 8, flex: 1 }}>
          {/* Name */}
          <View>
            <Text
              style={{ fontFamily: "dm", fontSize: 12, color: Colors.grey }}
            >
              Name
            </Text>
            <TextInput
              value={routineName}
              onChangeText={setRoutineName}
              style={{
                fontFamily: "dm-sb",
                fontSize: 16,
                paddingVertical: 4,
              }}
              placeholder="Routine name"
            />
          </View>

          {/* Due Date */}
          <Link href={"/(app)/(modals)/assign"} asChild>
            <TouchableOpacity>
              <Text
                style={{ fontFamily: "dm", fontSize: 12, color: Colors.grey }}
              >
                Assignees
              </Text>
              {cart.assignees.length === 0 ? (
                <Text style={{ fontFamily: "dm-sb", fontSize: 16 }}>None</Text>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {cart.assignees.map((athlete, index) => (
                    <Image
                      key={athlete.uid}
                      source={{ uri: athlete.image }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#FFF",
                        marginLeft: index === 0 ? 0 : -8, // overlap spacing
                        zIndex: cart.assignees.length - index, // ensure left-most is top
                      }}
                    />
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </Link>

          {/* Due */}
          <View>
            <Text
              style={{ fontFamily: "dm", fontSize: 12, color: Colors.grey }}
            >
              Due
            </Text>
            <Text style={{ fontFamily: "dm-sb", fontSize: 16 }}>Anytime</Text>
          </View>
        </View>
      </View>
      {cart.exercises.length === 0 ? (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "dm-sb",
            color: Colors.grey2,
          }}
        >
          No routines.
        </Text>
      ) : (
        <FlatList
          data={cart.exercises}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 200 }} // To account for the footer
          renderItem={({ item }) => {
            const isInCart = cart.exercises.some(
              (cartItem) => cartItem.id === item.id
            );
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
                        backgroundColor: Colors.red,
                        borderWidth: 1,
                        borderColor: Colors.red,
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
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          paddingVertical: 16,
          paddingHorizontal: 16,
          flexDirection: "column",
          gap: 8,
          borderTopColor: Colors.faintGrey,
          borderTopWidth: 1,
        }}
      >
        {/* <TouchableOpacity
          style={{
            paddingVertical: 16,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors.dark,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: Colors.dark,
            }}
          >
            Add to Routine
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={createRoutine}
          disabled={isUploading}
          style={{
            paddingVertical: 16,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            backgroundColor: isUploading ? Colors.faintGrey : Colors.dark,
            borderColor: isUploading ? Colors.faintGrey : Colors.dark,
            borderRadius: 8,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: "#FFF",
            }}
          >
            {isUploading ? "Loading..." : "Create Routine"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
