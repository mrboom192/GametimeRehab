import { Text, ScrollView, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { router, Tabs } from "expo-router";
import { useUser } from "@/src/contexts/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "@/src/components/LabeledInput";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import IconButton from "@/src/components/buttons/IconButton";
import { useSession } from "@/src/contexts/AuthContext";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Avatar from "@/src/components/Avatar";

const Profile = () => {
  const { data } = useUser();
  const { signOut } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.01,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      // Resize & compress image
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300, height: 300 } }], // Resize image
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(manipulated.uri); // Resized image
      uploadImage(manipulated.uri);
    }
  };

  async function uploadImage(imageUri: string) {
    setIsUploading(true); // Make sure user cant double tap create routine button

    let uploadedImageURL: string | null = null;
    const uid = auth.currentUser?.uid;

    // Upload image if exists
    if (imageUri) {
      const fileRef = ref(storage, `users/${uid}.jpg`);

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
        xhr.open("GET", imageUri, true);
        xhr.send(null);
      });

      try {
        await uploadBytes(fileRef, blob);
        console.log("Ran"); // Only logs if successful
      } catch (error) {
        console.error("uploadBytes failed:", error);
      }

      // Clean up blob (optional chaining for safety)
      // @ts-ignore
      blob.close?.();

      uploadedImageURL = await getDownloadURL(fileRef);
    }

    // Update or set the user document in Firestore
    const userRef = doc(db, "users", uid as string);

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Update existing user document
        await updateDoc(userRef, {
          image: uploadedImageURL,
        });
      }

      console.log("User Firestore document updated.");
    } catch (error) {
      console.error("Error updating Firestore user doc:", error);
    }

    setIsUploading(false);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFF" }}
      contentContainerClassName="flex-col bg-white p-5 gap-8"
      overScrollMode="never" // android only
    >
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text className="text-[#2C2C2C] text-4xl">Account Info</Text>
          ),
          headerRight: () => (
            <IconButton
              icon={
                <Ionicons size={24} name={"log-out-outline"} color="#f56565" />
              }
              handlePress={() => signOut()}
              theme="light"
            />
          ),
        }}
      />

      <Avatar onPress={pickImage} size={64} uri={data.image} />

      {/* First Name and Last Name */}
      <View className="flex flex-col gap-4">
        <LabeledInput
          label="First name"
          placeholder="John"
          value={data.first_name}
          editable={false}
        />
        <LabeledInput
          label="Last name"
          placeholder="Smith"
          value={data.last_name}
          editable={false}
        />
      </View>

      {/* Email */}
      <LabeledInput
        label="Email"
        placeholder="example@example.com"
        value={data.email}
        iconLeft={<Ionicons name="mail-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* Phone Number */}
      <LabeledInput
        label="Phone number (optional)"
        placeholder="(123) 555-7890"
        value={data.phone || "No phone number"}
        iconLeft={<Ionicons name="call-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* FAFSA */}
      <LabeledInput
        label="Institution FAFSA code"
        placeholder="123456"
        value={data.institution_code}
        iconLeft={<Ionicons name="school-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* Program/Sport */}
      <LabeledInput
        label="Program/Sport"
        placeholder="Wrestling, Track, Football, etc..."
        value={data.sport || "Not specified"}
        iconLeft={
          <Ionicons
            name="american-football-outline"
            size={16}
            color="#717171"
          />
        }
        editable={false}
      />

      {/* Position/Weight class */}
      <LabeledInput
        label="Position/Weight class"
        placeholder="Quarter Back, Striker, Right Back, etc..."
        value={data.position || "Not specified"}
        editable={false}
      />

      {/* System of Measurement */}
      <View className="flex flex-row gap-2">
        <LabeledInput
          label="System of Measurement"
          placeholder="Metric/Imperial"
          value={data.system_of_measurement || "Not specified"}
          editable={false}
        />
      </View>

      {/* Weight */}
      <LabeledInput
        label="Weight"
        placeholder="000"
        value={
          data.system_of_measurement === "imperial"
            ? `${data.weight_value || "N/A"} Pounds`
            : `${data.weight_value || "N/A"} Kilograms`
        }
        editable={false}
      />

      {/* Height */}
      <LabeledInput
        label="Height"
        placeholder="000"
        value={
          data.system_of_measurement === "imperial"
            ? `${data.height_feet || "0"}' ${data.height_inches || "0"}"`
            : `${data.height_cm || "0"} cm`
        }
        editable={false}
      />

      {/* Gender */}
      <LabeledInput
        label="Gender"
        placeholder="Male/Female"
        value={data.gender || "Not specified"}
        editable={false}
      />

      {data.type === "athlete" ? (
        <View className="mb-32">
          <NavigateButton
            href="/profile/pair"
            title="pair with trainer"
            theme="dark"
          />
        </View>
      ) : (
        <View className="mb-32">
          <NavigateButton
            href="/profile/pair"
            title={`${data.pending_requests.length} pair ${
              data.pending_requests.length === 1 ? "request" : "requests"
            } `}
            theme="dark"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;
