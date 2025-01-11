import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSignup } from "@/src/contexts/SignupContext";
import { useRouter } from "expo-router"; // Corrected router import
import Ionicons from "@expo/vector-icons/Ionicons";
import Questionnaire from "@/src/components/Questionnaire";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import firestore from "@react-native-firebase/firestore";

export default function AthleteSurvey4() {
  const { signupData, updateSignupData } = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        signupData.email,
        signupData.password
      );

      const user = userCredential.user;

      // Save user details to Firestore
      await firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          first_name: signupData.first_name,
          last_name: signupData.last_name,
          email: user.email,
          phone: signupData.phone || null,
          type: signupData.type,

          institution_code: signupData.institution_code,
          sport: signupData.sport,
          position: signupData.position,

          createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp of registration

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

      alert("User registered successfully!");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    signUp();
    if (signupData.athlete_injuries_impact_frequency) {
      router.push("./athlete-survey-4", { relativeToDirectory: false });
    } else {
      setError("Please select an option to proceed.");
    }
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
              className="py-2.5 px-3 justify-center flex-row items-center rounded-lg bg-white border border-[#717171] gap-2"
              onPress={handleSubmit}
            >
              <Text className="text-black uppercase">Next</Text>
              <Ionicons name="chevron-forward" size={16} color="#000" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
