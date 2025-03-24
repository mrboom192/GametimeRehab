import { View, Text, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
    <View style={{ padding: 16 }}>
      <Stack.Screen options={{ title: routine!.name || "Routine" }} />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{routine.name}</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default RoutinePage;

// async function uploadImageAsync(uri) {
//   // Why are we using XMLHttpRequest? See:
//   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       console.log(e);
//       reject(new TypeError("Network request failed"));
//     };
//     xhr.responseType = "blob";
//     xhr.open("GET", uri, true);
//     xhr.send(null);
//   });

//   const fileRef = ref(getStorage(), uuid.v4());
//   const result = await uploadBytes(fileRef, blob);

//   // We're done with the blob, close and release it
//   blob.close();

//   return await getDownloadURL(fileRef);
// }
