import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Questionnaire from "@/src/components/Questionnaire";
import firestore from "@react-native-firebase/firestore";
import { useSession } from "@/src/contexts/AuthContext";

export default function TrainerSurvey4() {
  const { signupData, updateSignupData } = useSignup();
  const { signUp } = useSession();
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

  const handleSubmit = () => {
    signUp(signupData.email, signupData.password, {
      first_name: signupData.first_name,
      last_name: signupData.last_name,
      email: signupData.email,
      phone: signupData.phone || null,
      type: signupData.type,

      institution_code: signupData.institution_code,
      sport: signupData.sport,
      position: signupData.position,

      createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp of registration

      // Trainer specific data below
      athlete_count: signupData.athlete_count,
      trainer_challenges: signupData.trainer_challenges,
      trainer_interested_in_gamification:
        signupData.trainer_interested_in_gamification,
      trainer_communication_styles: signupData.trainer_communication_styles,
      trainer_update_frequency: signupData.trainer_update_frequency,
      trainer_code: generateRandomCode(),
      pendingRequests: [],
    });
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
