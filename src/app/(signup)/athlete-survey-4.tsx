import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";

import { serverTimestamp } from "firebase/firestore";

import { useSignup } from "@/src/contexts/SignupContext";
import Questionnaire from "@/src/components/Questionnaire";
import { useSession } from "@/src/contexts/AuthContext";

export default function AthleteSurvey4() {
  const { signupData, updateSignupData } = useSignup();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useSession();

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

      createdAt: serverTimestamp(), // Timestamp of registration

      // Athlete specific data below
      system_of_measurement: signupData.system_of_measurement,
      weight_value: signupData.weight_value,
      height_feet: signupData.height_feet || null, // Optional for imperial
      height_inches: signupData.height_inches || null, // Optional for imperial
      height_cm: signupData.height_cm || null, // Optional for metric
      gender: signupData.gender,
      athlete_past_injuries: signupData.athlete_past_injuries,
      athlete_motivation: signupData.athlete_motivation,
      athlete_challenges: signupData.athlete_challenges,
      athlete_injuries_impact_frequency:
        signupData.athlete_injuries_impact_frequency,
    });
  };

  const handleSelect = (answer: string) => {
    updateSignupData("athlete_injuries_impact_frequency", answer);
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
            question="How do injuries impact your mental well-being?"
            options={["Never", "Rarely", "Sometimes", "Frequently"]}
            state={signupData.athlete_injuries_impact_frequency}
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
