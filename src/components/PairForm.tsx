import { View, Text, Pressable, TouchableOpacity } from "react-native";
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
import { auth, db } from "@/firebaseConfig";
import { useUser } from "../contexts/UserContext";
import { TextSemiBold } from "./StyledText";
import Colors from "../constants/Colors";

const PairForm = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { data } = useUser();

  if (!data) {
    setError("User data not found.");
    setLoading(false);
    return;
  }

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
      if (!auth.currentUser) {
        setError("You must be logged in to request a pair.");
        setLoading(false);
        return;
      }

      // Find the trainer with the entered code
      const trainerSnapshot = await getDocs(
        query(collection(db, "users"), where("trainer_code", "==", code))
      );

      if (trainerSnapshot.empty) {
        setError("No trainer found with this code.");
        setLoading(false);
        return;
      }

      const trainerDoc = trainerSnapshot.docs[0];
      const trainerData = trainerDoc.data();

      const dataToTrainer = {
        uid: data.uid,
        first_name: data.first_name,
        last_name: data.last_name,
        image: data.image,
      };

      // Add the current user's info to the trainer's pending_requests
      await updateDoc(doc(db, "users", trainerDoc.id), {
        pending_requests: arrayUnion(dataToTrainer),
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
        onChangeText={(text) => {
          setCode(text);
          setError(undefined);
          setSuccess(undefined);
        }}
        note="Provided to you by trainer"
        error={error}
        success={success}
      />

      <TouchableOpacity
        accessibilityRole="button"
        onPress={handlePair}
        disabled={loading}
        style={{
          borderRadius: 12,
          backgroundColor: Colors.dark,
          alignItems: "center",
          padding: 14,
          marginTop: 16,
          opacity: loading ? 0.5 : 1,
        }}
      >
        <TextSemiBold style={{ color: "#FFF" }}>
          {loading ? "Sending..." : "Request Pair"}
        </TextSemiBold>
      </TouchableOpacity>
    </View>
  );
};

export default PairForm;
