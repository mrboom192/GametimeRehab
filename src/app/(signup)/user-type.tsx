import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UserType() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Use a string to provide a meaningful error message

  const handleNext = () => {
    if (signupData.type === "athlete") {
      router.push("./athlete-details", { relativeToDirectory: false });
    } else if (signupData.type === "trainer") {
      router.push("./trainer-details", { relativeToDirectory: false }); // Add navigation for trainers
    } else {
      setError("Please select an option to proceed."); // Set a descriptive error message
    }
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
        <View className="flex flex-col gap-8 w-full">
          <View className="flex flex-col self-stretch items-start gap-2">
            <Text className="text-[#2C2C2C] text-4xl capitalize">
              Hey {signupData.first_name},
            </Text>
            <Text className="text-[#2C2C2C] text-2xl">
              Which describes you best?
            </Text>
          </View>

          {/* Center the buttons vertically */}
          <View className="flex w-full self-stretch items-center justify-center flex-col gap-2">
            {/* Athlete Button */}
            <Pressable
              className={`py-2.5 px-3 w-[334px] flex flex-row items-center justify-start rounded-lg border ${
                signupData.type === "athlete"
                  ? "bg-[#2C2C2C] border-[#2C2C2C]"
                  : "bg-white border-[#717171]"
              }`}
              onPress={() => handleSelect("athlete")}
            >
              <Text
                className={`w-full text-center uppercase ${
                  signupData.type === "athlete"
                    ? "text-white"
                    : "text-[#2C2C2C]"
                }`}
              >
                Athlete
              </Text>
            </Pressable>

            {/* Trainer Button */}
            <Pressable
              className={`py-2.5 px-3 w-[334px] flex flex-row items-center justify-start rounded-lg border ${
                signupData.type === "trainer"
                  ? "bg-[#2C2C2C] border-[#2C2C2C]"
                  : "bg-white border-[#717171]"
              }`}
              onPress={() => handleSelect("trainer")}
            >
              <Text
                className={`w-full text-center uppercase ${
                  signupData.type === "trainer"
                    ? "text-white"
                    : "text-[#2C2C2C]"
                }`}
              >
                Trainer/Coach/PT
              </Text>
            </Pressable>
          </View>

          <View>
            {signupData.type && (
              <Text className="text-[#2C2C2C] text-xl">
                {signupData.type === "athlete"
                  ? `As an athlete, you’ll gain access to hundreds of recovery programs curated by your trainer. Track your progress, stay on top of your goals, and achieve peak performance with personalized guidance every step of the way.`
                  : `As a trainer, you’ll have the tools to empower athletes to reach their full potential. Create customized recovery programs, manage your athletes effortlessly, and grow your expertise while making a real impact.`}
              </Text>
            )}
            {error && (
              <Text className="text-red-500 text-xl">{error}</Text> // Show error message
            )}
          </View>
        </View>

        {/* Footer Section */}
        <View className="flex flex-row items-center justify-end self-stretch gap-6">
          <Text className="text-slate-700 italic text-center">
            3 minutes to finish.
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
