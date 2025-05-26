import { router } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignup } from "@/src/contexts/SignupContext";
import { TextRegular } from "@/src/components/StyledText";
import Colors from "@/src/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SubmitHandler, useForm } from "react-hook-form";
import ControllerInput from "@/src/components/ControllerInput";

export default function SignupScreen() {
  const { signupData, updateSignupData } = useSignup();
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    (Object.keys(data) as (keyof typeof signupData)[]).forEach((field) => {
      updateSignupData(field, data[field]);
    });

    router.push("./user-type", { relativeToDirectory: false });
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* First Name and Last Name */}
      <ControllerInput
        name="first_name"
        control={control}
        label="First name"
        placeholder="e.g. John"
        rules={{ required: "First name is required" }}
      />
      <ControllerInput
        name="last_name"
        control={control}
        label="Last name"
        placeholder="e.g. Doe"
        rules={{ required: "Last name is required" }}
      />

      <ControllerInput
        name="email"
        control={control}
        label="Email"
        placeholder="e.g. Doe"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }}
        iconLeft="email"
      />
      <ControllerInput
        name="phone"
        control={control}
        label="Phone number (optional)"
        placeholder="(123) 555-7890"
        rules={{
          pattern: {
            value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            message: "Invalid phone number format",
          },
        }}
        iconLeft="phone"
      />

      {/* Dividing 1px line */}
      <View
        style={{
          height: 1,
          backgroundColor: Colors.faintGrey,
          marginVertical: 16,
        }}
      />

      <ControllerInput
        name="password"
        control={control}
        label="Create password"
        placeholder="Enter a 6+ length password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        iconLeft="lock"
        sensitive
      />
      <ControllerInput
        name="confirm_password"
        control={control}
        label="Confirm password"
        placeholder="Re-enter your password"
        rules={{
          required: "Please confirm your password",
          validate: (value: string, formValues: any) =>
            value === formValues.password || "Passwords do not match",
        }}
        iconLeft="lock"
        sensitive
      />

      {/* Dividing 1px line */}
      <View
        style={{
          height: 1,
          backgroundColor: Colors.faintGrey,
          marginVertical: 16,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TextRegular style={{ color: Colors.lightText }}>
          By signing up, you agree to our{" "}
        </TextRegular>
        <TextRegular
          onPress={() => router.push("/terms")}
          style={{ color: Colors.primary }}
        >
          Terms & Conditions
        </TextRegular>
        <TextRegular style={{ color: Colors.lightText }}> and </TextRegular>
        <TextRegular
          onPress={() => router.push("/privacy-policy")}
          style={{ color: Colors.primary }}
        >
          Privacy Policy
        </TextRegular>
        <TextRegular>.</TextRegular>
      </View>

      {/* Footer Section */}
      <View className="flex flex-row items-center justify-end self-stretch gap-6 my-8">
        <Text className="text-slate-700 italic text-center">
          Less than 4 minutes to finish.
        </Text>
        <Pressable
          className="py-2.5 px-3 justify-center flex-row items-center rounded-lg bg-white border border-[#717171] gap-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-black uppercase">Next</Text>
          <Ionicons name="chevron-forward" size={16} color="#000" />
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    backgroundColor: "#fff",

    padding: 16,
    position: "relative",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  disclaimer: {
    color: Colors.lightText,
    fontSize: 12,
    marginTop: 48,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: Colors.dark,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 64,
    alignSelf: "center",
    width: "100%",
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
  },
});
