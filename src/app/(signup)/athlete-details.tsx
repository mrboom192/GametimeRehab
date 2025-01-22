import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "@/src/components/LabeledInput";

interface Errors {
  institution_code?: string;
  gender?: string;
  weight?: string;
  height?: string;
  sport?: string;
  position?: string;
}

export default function AthleteDetails() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});

  const handleNext = () => {
    if (validateFields()) {
      router.push("./athlete-survey-1"); // Navigate to the next step
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

    // Gender validation
    if (!signupData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    // Weight validation
    if (
      !signupData.weight_value ||
      isNaN(parseFloat(signupData.weight_value))
    ) {
      newErrors.weight = "Enter a valid weight.";
    }

    // Height validation
    if (
      signupData.system_of_measurement === "imperial" &&
      (!signupData.height_feet ||
        !signupData.height_inches ||
        isNaN(parseFloat(signupData.height_feet)) ||
        isNaN(parseFloat(signupData.height_inches)))
    ) {
      newErrors.height = "Height is required.";
    } else if (
      signupData.system_of_measurement === "metric" &&
      (!signupData.height_cm || isNaN(parseFloat(signupData.height_cm)))
    ) {
      newErrors.height = "Height is required.";
    }

    // Sport validation
    if (!signupData.sport.trim()) {
      newErrors.sport = "Sport is required.";
    }

    // Position validation
    if (!signupData.position.trim()) {
      newErrors.position = "Enter a position.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleUnitSwitch = (system_of_measurement: string) => {
    if (system_of_measurement !== signupData.system_of_measurement) {
      if (system_of_measurement === "metric") {
        // Convert from imperial to metric
        const weightInKg =
          signupData.weight_value && signupData.weight_value !== ""
            ? parseFloat(
                (parseFloat(signupData.weight_value) * 0.453592).toFixed(2)
              ).toString() // lbs to kg, truncated
            : ""; // Keep it empty if weight_value is empty

        const totalInches =
          parseFloat(signupData.height_feet || "0") * 12 +
          parseFloat(signupData.height_inches || "0"); // Total height in inches (allowing decimal inches)
        const heightInCm =
          totalInches > 0
            ? parseFloat((totalInches * 2.54).toFixed(2)).toString() // Inches to cm, truncated
            : ""; // Empty if totalInches is zero

        updateSignupData("weight_value", weightInKg);
        updateSignupData("height_cm", heightInCm);
        updateSignupData("height_feet", ""); // Clear feet/inches
        updateSignupData("height_inches", "");
      } else if (system_of_measurement === "imperial") {
        // Convert from metric to imperial
        const weightInLbs =
          signupData.weight_value && signupData.weight_value !== ""
            ? parseFloat(
                (parseFloat(signupData.weight_value) / 0.453592).toFixed(2)
              ).toString() // kg to lbs, truncated
            : ""; // Keep it empty if weight_value is empty

        const totalInches =
          signupData.height_cm && signupData.height_cm !== ""
            ? parseFloat(signupData.height_cm) / 2.54 // cm to inches (allowing decimal inches)
            : 0;
        const heightFeet = totalInches > 0 ? Math.floor(totalInches / 12) : ""; // Convert inches to feet or empty
        const heightInches =
          totalInches > 0
            ? parseFloat((totalInches % 12).toFixed(2)).toString() // Remaining inches, truncated
            : ""; // Empty if totalInches is zero

        updateSignupData("weight_value", weightInLbs);
        updateSignupData("height_feet", heightFeet.toString());
        updateSignupData("height_inches", heightInches);
        updateSignupData("height_cm", ""); // Clear cm
      }
    }

    updateSignupData("system_of_measurement", system_of_measurement);
  };

  const handleWeightChange = (text: string) => {
    // Allow only numbers and a single decimal point
    const sanitizedText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and extra characters
    const decimalCheck = sanitizedText.split("."); // Split by the decimal point

    // Prevent multiple decimal points
    if (decimalCheck.length > 2) {
      return;
    }

    // Handle empty or isolated decimal inputs
    if (sanitizedText === "" || sanitizedText === ".") {
      updateSignupData("weight_value", ""); // Keep it as an empty string
      return;
    }

    // Convert to a numeric value
    const numericValue = parseFloat(sanitizedText);

    // Validate and update state
    if (!isNaN(numericValue) && numericValue <= 1500) {
      updateSignupData("weight_value", sanitizedText); // Update state if valid
    } else {
      updateSignupData("weight_value", ""); // Reset to empty string for invalid input
    }
  };

  const handleHeightFeetChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, "").substring(0, 1); // Allow only 1 digit
    updateSignupData("height_feet", sanitizedText);
  };

  const handleHeightInchesChange = (text: string) => {
    // Allow only numbers and a single decimal point
    let sanitizedText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    const parts = sanitizedText.split("."); // Split to check for multiple decimals

    // Prevent invalid input with multiple decimal points
    if (parts.length > 2) return;

    // Remove leading zeros, but preserve a single leading '0' for decimals (e.g., "0.5")
    if (parts[0] === "0" && parts.length === 1) {
      sanitizedText = "0"; // Keep single '0'
    } else if (parts[0].startsWith("0") && parts[0].length > 1) {
      parts[0] = parts[0].replace(/^0+/, ""); // Remove leading zeros
      sanitizedText = parts.join(".");
    }

    const numericValue = parseFloat(sanitizedText);

    // Validate range and update state
    if (sanitizedText === "") {
      updateSignupData("height_inches", ""); // Allow clearing input
    } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue < 12) {
      // Remove unnecessary trailing zeros after the decimal
      if (numericValue % 1 === 0) {
        sanitizedText = numericValue.toString(); // Remove decimals if the value is a whole number
      } else {
        sanitizedText = numericValue.toString(); // Allow decimals, no need for toFixed here
      }
      updateSignupData("height_inches", sanitizedText); // Update state with valid value
    }
  };

  const handleHeightCmChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    updateSignupData("height_cm", sanitizedText);
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
              iconLeft={
                <Ionicons name="school-outline" size={16} color="#717171" />
              }
              onChangeText={(text) =>
                updateSignupData("institution_code", text)
              }
              note="Provided to you by trainer"
              error={errors.institution_code}
            />
            <LabeledInput
              label="Program/Sport"
              placeholder="Wrestling, Track, Football, etc..."
              value={signupData.sport}
              iconLeft={
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
              label="Position/Weight class"
              placeholder="Quarter Back, Striker, Right Back, etc..."
              value={signupData.position}
              onChangeText={(text) => updateSignupData("position", text)}
              error={errors.position}
            />

            <View className="flex flex-row gap-2">
              <Pressable
                className={`py-2.5 px-3 flex flex-row self-baseline items-center justify-start rounded-lg border ${
                  signupData.system_of_measurement === "metric"
                    ? "bg-[#2C2C2C] border-[#2C2C2C]"
                    : "bg-white border-[#717171]"
                }`}
                onPress={() => handleUnitSwitch("metric")}
              >
                <Text
                  className={`${
                    signupData.system_of_measurement === "metric"
                      ? "text-white"
                      : "text-[#2C2C2C]"
                  }`}
                >
                  Metric
                </Text>
              </Pressable>
              <Pressable
                className={`py-2.5 px-3 flex flex-row self-baseline items-center justify-start rounded-lg border ${
                  signupData.system_of_measurement === "imperial"
                    ? "bg-[#2C2C2C] border-[#2C2C2C]"
                    : "bg-white border-[#717171]"
                }`}
                onPress={() => handleUnitSwitch("imperial")}
              >
                <Text
                  className={`${
                    signupData.system_of_measurement === "imperial"
                      ? "text-white"
                      : "text-[#2C2C2C]"
                  }`}
                >
                  Imperial
                </Text>
              </Pressable>
            </View>

            {signupData.system_of_measurement === "imperial" ? (
              <>
                {/* Weight Input */}
                <View className="w-44">
                  <LabeledInput
                    label="Weight"
                    placeholder="000"
                    unit="Pounds"
                    value={signupData.weight_value}
                    onChangeText={(text) => handleWeightChange(text)}
                    keyboardType="numeric"
                    error={errors.weight}
                  />
                </View>

                {/* Height Inputs */}
                <View className="flex flex-row gap-2 items-end">
                  <View className="w-24">
                    <LabeledInput
                      label="Height"
                      placeholder="0"
                      unit="Feet"
                      value={signupData.height_feet}
                      onChangeText={(text) => handleHeightFeetChange(text)}
                      keyboardType="numeric"
                    />
                  </View>
                  <View className="w-32">
                    <LabeledInput
                      label=""
                      placeholder="00"
                      unit="Inches"
                      value={signupData.height_inches}
                      onChangeText={(text) => handleHeightInchesChange(text)}
                      keyboardType="numeric"
                      error={errors.height}
                    />
                  </View>
                </View>
              </>
            ) : (
              <>
                {/* Weight Input */}
                <View className="w-44">
                  <LabeledInput
                    label="Weight"
                    placeholder="000"
                    unit="Kilograms"
                    value={signupData.weight_value}
                    onChangeText={(text) => handleWeightChange(text)}
                    keyboardType="numeric"
                    error={errors.weight}
                  />
                </View>

                {/* Height Input */}
                <View className="w-48">
                  <LabeledInput
                    label="Height"
                    placeholder="000"
                    unit="Centimeters"
                    value={signupData.height_cm}
                    onChangeText={(text) => handleHeightCmChange(text)}
                    keyboardType="numeric"
                    error={errors.height}
                  />
                </View>
              </>
            )}
            <View className="flex flex-row items-center gap-4 self-baseline">
              <Text className="flex self-baseline text-slate-700 text-sm font-medium">
                Gender
              </Text>
              {errors.gender ? (
                <View>
                  <Text className="text-red-500 text-xs">{errors.gender}</Text>
                </View>
              ) : (
                <></>
              )}
            </View>
            <View className="flex flex-row gap-2">
              {["male", "female"].map((gender) => (
                <Pressable
                  key={gender}
                  className={`py-2.5 px-3 flex flex-row self-baseline items-center justify-start rounded-lg border ${
                    signupData.gender === gender
                      ? "bg-[#2C2C2C] border-[#2C2C2C]"
                      : "bg-white border-[#717171]"
                  }`}
                  onPress={() => updateSignupData("gender", gender)}
                >
                  <Text
                    className={`${
                      signupData.gender === gender
                        ? "text-white"
                        : "text-[#2C2C2C]"
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
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
