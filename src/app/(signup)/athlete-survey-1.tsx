import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AthleteSurvey1() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Use a string to provide a meaningful error message

  const handleNext = () => {
    router.push("./trainer-survey-2", { relativeToDirectory: false }); // Add navigation for trainers
  };

  const handleSelect = (type: string) => {
    updateSignupData("type", type);
    if (error) {
      setError(null); // Clear the error message when a valid option is selected
    }
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col self-stretch justify-between items-start mx-8 my-16">
        <Text>The</Text>
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
