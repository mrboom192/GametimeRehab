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
  const { user } = useUser();

  const handlePair = async () => {
    setError("");

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
      const trainerQuery = query(
        collection(db, "users"),
        where("type", "==", "trainer"),
        where("trainer_code", "==", code)
      );

      const trainerSnapshot = await getDocs(trainerQuery);

      if (trainerSnapshot.empty) {
        setError("No trainer found with this code.");
        setLoading(false);
        return;
      }

      const trainerDoc = trainerSnapshot.docs[0];
      const trainerData = trainerDoc.data();

      console.log(trainerData);

      // Add the current user's UID to the trainer's pending_requests
      await updateDoc(doc(db, "users", trainerDoc.id), {
        pending_requests: arrayUnion(user.uid),
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
