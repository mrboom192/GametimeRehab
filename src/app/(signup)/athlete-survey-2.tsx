import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AthleteSurvey2() {
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
      </View>
    </View>
  );
}
