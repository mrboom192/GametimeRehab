import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Questionnaire from "@/src/components/Questionnaire";
import { FirebaseError } from "firebase/app";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function TrainerSurvey4() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRandomCode = (length = 8): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const signUp = async () => {
    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        signupData.email,
        signupData.password
      );

      const user = userCredential.user;

      // Save user details to Firestore
      await firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          first_name: signupData.first_name,
          last_name: signupData.last_name,
          email: user.email,
          phone: signupData.phone || null,
          type: signupData.type,

          institution_code: signupData.institution_code,
          sport: signupData.sport,
          position: signupData.position,

          createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp of registration

          // Athlete specific data below
          athlete_count: signupData.athlete_count,
          trainer_challenges: signupData.trainer_challenges,
          trainer_interested_in_gamification:
            signupData.trainer_interested_in_gamification,
          trainer_communication_styles: signupData.trainer_communication_styles,
          trainer_update_frequency: signupData.trainer_update_frequency,
          trainer_code: generateRandomCode(),
          pendingRequests: [],
        });

      router.replace("/first-welcome");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    signUp();
  };

  const handleSelect = (answer: string) => {
    updateSignupData("trainer_update_frequency", answer);
    if (error) {
      setError(null); // Clear the error message when a valid option is selected
    }
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col self-stretch justify-between items-start mx-8 mt-8 mb-16">
        <View className="flex flex-col self-stretch gap-4">
          <Questionnaire
            title="Question 4/4"
            question="How often would you like to receive updates about athlete progress?"
            options={["Daily", "Weekly", "Bi-monthly", "Monthly", "Custom"]}
            state={signupData.trainer_update_frequency}
            handleSelect={handleSelect}
          />
          {error && (
            <Text className="text-red-500 text-xl">{error}</Text> // Error message
          )}
        </View>

        {loading ? (
          <ActivityIndicator size={"small"} style={{ margin: 28 }} />
        ) : (
          <View className="flex flex-row items-center justify-end self-stretch gap-6">
            <Text className="text-slate-700 italic text-center">
              Less than a minute to finish.
            </Text>
            <Pressable
              className="py-2.5 px-6 justify-center flex-row items-center rounded-lg bg-[#2C2C2C] border gap-2"
              onPress={handleSubmit}
            >
              <Text className="text-white uppercase">Done</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
