import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Questionnaire from "@/src/components/Questionnaire";

export default function TrainerSurvey2() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (signupData.trainer_interested_in_gamification) {
      router.push("./trainer-survey-3", { relativeToDirectory: false });
    } else {
      setError("Please select an option to proceed.");
    }
  };

  const handleSelect = (answer: string) => {
    updateSignupData("trainer_interested_in_gamification", answer);
    if (error) {
      setError(null); // Clear the error message when a valid option is selected
    }
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col self-stretch justify-between items-start mx-8 mt-8 mb-16">
        <View className="flex flex-col self-stretch gap-4">
          <Questionnaire
            title="Question 2/4"
            question="Are you interested in using gamified features like leaderboards or streak tracking to motivate athletes?"
            options={["Yes", "No"]}
            state={signupData.trainer_interested_in_gamification}
            handleSelect={handleSelect}
          />
          {error && (
            <Text className="text-red-500 text-xl">{error}</Text> // Error message
          )}
        </View>

        <View className="flex flex-row items-center justify-end self-stretch gap-6">
          <Text className="text-slate-700 italic text-center">
            Less than a minute to finish.
          </Text>
          <Pressable
            className="py-2.5 px-3 justify-center flex-row items-center rounded-lg bg-white border border-[#717171] gap-2"
            onPress={handleNext}
          >
            <Text className="text-black uppercase">Next</Text>
            <Ionicons name="chevron-forward" size={16} color="#000" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
