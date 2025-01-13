import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "@/src/components/LabeledInput";

interface Errors {
  athlete_count?: string;
  institution_code?: string;
  gender?: string;
  weight?: string;
  height?: string;
  sport?: string;
  position?: string;
}

export default function TrainerDetails() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});

  const handleNext = () => {
    if (validateFields()) {
      router.push("./trainer-survey-1"); // Navigate to the next step
    }
  };

  const validateFields = (): boolean => {
    const newErrors: Errors = {};

    // FAFSA validation
    if (!signupData.institution_code) {
      newErrors.institution_code = "FAFSA code is required.";
    } else if (!/^[a-zA-Z0-9]{6}$/.test(signupData.institution_code)) {
      newErrors.institution_code =
        "FAFSA code must be exactly 6 alphanumeric characters.";
    }

    // Sport validation
    if (!signupData.sport.trim()) {
      newErrors.sport = "Sport is required.";
    }

    // Position validation
    if (!signupData.position.trim()) {
      newErrors.position = "Enter a position.";
    }

    // Athlete count validation
    if (
      !signupData.athlete_count ||
      isNaN(parseInt(signupData.athlete_count)) ||
      parseInt(signupData.athlete_count) <= 0
    ) {
      newErrors.athlete_count = "Enter a valid athlete count.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleathlete_countChange = (text: string) => {
    updateSignupData("athlete_count", text);
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col self-stretch justify-between items-start mx-8 mt-8 mb-16">
        <View className="flex flex-col self-stretch gap-8">
          <Text className="text-[#2C2C2C] text-4xl">Almost there!</Text>
          <View className="flex flex-col self-stretch gap-4">
            {/* Institution code */}
            <LabeledInput
              label="Institution FAFSA code"
              placeholder="123456"
              value={signupData.institution_code}
              icon={
                <Ionicons name="school-outline" size={16} color="#717171" />
              }
              onChangeText={(text) =>
                updateSignupData("institution_code", text)
              }
              error={errors.institution_code}
            />
            <LabeledInput
              label="Program/Sport"
              placeholder="Wrestling, Track, Football, etc..."
              value={signupData.sport}
              icon={
                <Ionicons
                  name="american-football-outline"
                  size={16}
                  color="#717171"
                />
              }
              onChangeText={(text) => updateSignupData("sport", text)}
              error={errors.sport}
            />

            <LabeledInput
              label="Role"
              placeholder="Trainer, Coach, PT, etc..."
              value={signupData.position}
              onChangeText={(text) => updateSignupData("position", text)}
              error={errors.position}
            />

            <LabeledInput
              label="How many athletes are you working with?"
              placeholder="0"
              note="An estimate is fine."
              value={signupData.athlete_count}
              onChangeText={(text) => handleathlete_countChange(text)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View className="flex flex-row items-center justify-end self-stretch gap-6">
          <Text className="text-slate-700 italic text-center">
            2 minutes to finish.
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
