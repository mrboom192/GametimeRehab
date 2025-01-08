import { Link, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import LabeledInput from "../../components/LabeledInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignup } from "@/src/contexts/SignupContext";

export default function SignupScreen() {
  const { signupData, updateSignupData } = useSignup();

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
            />
            <LabeledInput
              label="Last name"
              placeholder="Smith"
              value={signupData.lastName}
              onChangeText={(text) => updateSignupData("lastName", text)}
            />
          </View>

          {/* Email */}
          <LabeledInput
            label="Email"
            placeholder="example@example.com"
            value={signupData.email}
            onChangeText={(text) => updateSignupData("email", text)}
            icon={<Ionicons name="mail-outline" size={16} color="#717171" />}
          />

          {/* Phone Number */}
          <LabeledInput
            label="Phone number (optional)"
            placeholder="(123) 555-7890"
            value={signupData.phone}
            onChangeText={(text) => updateSignupData("phone", text)}
            icon={<Ionicons name="call-outline" size={16} color="#717171" />}
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
            />
          </View>
        </View>

        {/* Footer Section */}
        <View className="flex flex-row items-center justify-end self-stretch gap-6">
          <Text className="text-slate-700 italic text-center">
            Less than 4 minutes to finish.
          </Text>
          <Link href="/athlete-signup" asChild>
            <Pressable className="py-2.5 px-3 justify-center flex-row items-center rounded-lg bg-white border border-[#717171] gap-2">
              <Text className="text-black uppercase">Next</Text>
              <Ionicons name="chevron-forward" size={16} color="#000" />
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
