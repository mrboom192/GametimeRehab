import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";
import Questionnaire from "@/src/components/Questionnaire";
import LabeledInput from "@/src/components/LabeledInput";

export default function TrainerSurvey3() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (signupData.trainer_communication_styles) {
      router.push("./trainer-survey-4", { relativeToDirectory: false });
    } else {
      setError("Please select an option to proceed.");
    }
  };

  const handleSelect = (answer: string) => {
    // If the answer is already selected, remove it from the array, otherwise add it
    const updatedAnswers = signupData.trainer_communication_styles
      ? signupData.trainer_communication_styles.includes(answer)
        ? signupData.trainer_communication_styles.filter(
            (item) => item !== answer
          ) // Remove if already selected
        : [...signupData.trainer_communication_styles, answer] // Add if not selected
      : [answer]; // Initialize array if it's undefined or empty

    updateSignupData("trainer_communication_styles", updatedAnswers); // Update the state with the selected answers
    if (error) {
      setError(null); // Clear the error message when a valid option is selected
    }
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col self-stretch justify-between items-start mx-8 mt-8 mb-16">
        <View className="flex flex-col self-stretch gap-4">
          <Questionnaire
            title="Question 3/4"
            question="How do you currently communicate with athletes about rehabilitation progress?"
            note="Select all that apply"
            options={["In person", "Email", "Application", "Other"]}
            state={signupData.trainer_communication_styles}
            handleSelect={handleSelect}
          />
          {/* Add in custom logic herre */}
          {signupData.trainer_communication_styles?.includes("Other") ? (
            <LabeledInput
              label="Enter your other communication style"
              placeholder="Fax"
              value={""}
              onChangeText={() => {}}
            />
          ) : (
            <></>
          )}
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
