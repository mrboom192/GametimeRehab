import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import LabeledInput from "./LabeledInput";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useUser } from "../contexts/UserContext";

const PairForm = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { user, userInfo } = useUser();

  const handlePair = async () => {
    // Reset error message first
    setError("");

    // Client side code validation
    if (code.length !== 8) {
      setError("Trainer code must be 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        setError("You must be logged in to request a pair.");
        setLoading(false);
        return;
      }

      // Find the trainer with the entered code
      const trainerSnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("type", "==", "trainer"),
          where("trainer_code", "==", code)
        )
      );

      if (trainerSnapshot.empty) {
        setError("No trainer found with this code.");
        setLoading(false);
        return;
      }

      const trainerDoc = trainerSnapshot.docs[0];
      const trainerData = trainerDoc.data();

      const userInfoToTrainer = {
        uid: userInfo.uid,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        image: userInfo.image,
      };

      // Add the current user's info to the trainer's pending_requests
      await updateDoc(doc(db, "users", trainerDoc.id), {
        pending_requests: arrayUnion(userInfoToTrainer),
      });

      setSuccess(
        `Your pairing request has been sent to ${
          trainerData.first_name || "the trainer"
        }.`
      );
    } catch (error) {
      console.error("Error sending pair request:", error);
      setError("Failed to send pairing request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {/* Trainer code */}
      <LabeledInput
        label="8-digit trainer code"
        placeholder="12345678"
        value={code}
        onChangeText={(text) => setCode(text)}
        note="Provided to you by trainer"
        error={error}
        success={success}
      />
      <View className="rounded-lg bg-[#2C2C2C] overflow-hidden border">
        <Pressable
          android_ripple={{
            color: "#444",
            borderless: false,
          }}
          className="py-2.5 px-3 justify-center flex-row items-center rounded-lg gap-2"
          onPress={handlePair}
          disabled={loading} // Disable button while loading
        >
          <Text
            className={`text-white uppercase ${
              loading ? "opacity-50" : "opacity-100"
            }`}
          >
            {loading ? "Sending..." : "Request Pair"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PairForm;
