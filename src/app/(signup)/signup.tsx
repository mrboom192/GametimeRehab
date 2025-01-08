import { Link, router } from "expo-router";
import { Pressable, Text, View, Alert } from "react-native";
import LabeledInput from "../../components/LabeledInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignup } from "@/src/contexts/SignupContext";
import { useState } from "react";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupScreen() {
  const { signupData, updateSignupData } = useSignup();
  const [errors, setErrors] = useState<Errors>({});

  // Validation logic
  const validateFields = (): boolean => {
    const newErrors: Errors = {};

    if (!signupData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!signupData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (
      !signupData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)
    ) {
      newErrors.email = "Valid email is required.";
    }

    if (
      signupData.phone &&
      !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(signupData.phone)
    ) {
      newErrors.phone = "Phone number is invalid.";
    }

    if (!signupData.password || signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      router.push("./user-type", { relativeToDirectory: false });
    } else {
    }
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col justify-between items-start mx-8 mt-8 mb-16">
        <View className="flex flex-col gap-12">
          {/* First Name and Last Name */}
          <View className="flex flex-col gap-4">
            <LabeledInput
              label="First name"
              placeholder="John"
              value={signupData.firstName}
              onChangeText={(text) => updateSignupData("firstName", text)}
              error={errors.firstName}
            />
            <LabeledInput
              label="Last name"
              placeholder="Smith"
              value={signupData.lastName}
              onChangeText={(text) => updateSignupData("lastName", text)}
              error={errors.lastName}
            />
          </View>

          {/* Email */}
          <LabeledInput
            label="Email"
            placeholder="example@example.com"
            value={signupData.email}
            keyboardType="numeric"
            onChangeText={(text) => updateSignupData("email", text)}
            icon={<Ionicons name="mail-outline" size={16} color="#717171" />}
            error={errors.email}
          />

          {/* Phone Number */}
          <LabeledInput
            label="Phone number (optional)"
            placeholder="(123) 555-7890"
            value={signupData.phone}
            onChangeText={(text) => updateSignupData("phone", text)}
            icon={<Ionicons name="call-outline" size={16} color="#717171" />}
            error={errors.phone}
          />

          {/* Password Fields */}
          <View className="flex flex-col gap-4">
            <LabeledInput
              label="Create password"
              placeholder="Enter a 6+ length password"
              value={signupData.password}
              onChangeText={(text) => updateSignupData("password", text)}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#717171"
                />
              }
              secureTextEntry={true}
              error={errors.password}
            />
            <LabeledInput
              label="Confirm password"
              placeholder="Confirm your password"
              value={signupData.confirmPassword}
              onChangeText={(text) => updateSignupData("confirmPassword", text)}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#717171"
                />
              }
              secureTextEntry={true}
              error={errors.confirmPassword}
            />
          </View>
        </View>

        {/* Footer Section */}
        <View className="flex flex-row items-center justify-end self-stretch gap-6">
          <Text className="text-slate-700 italic text-center">
            Less than 4 minutes to finish.
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
