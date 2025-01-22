import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { useState } from "react";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "../LabeledInput";
import { useSession } from "@/src/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Sign-in failed");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white tems-center">
      <StatusBar backgroundColor={"#FFF"} style="dark" />
      <View className="flex-1 flex flex-col justify-between items-start mx-8 mt-4 mb-16">
        <KeyboardAvoidingView
          className="flex flex-col items-center justify-center gap-8"
          behavior="padding"
        >
          <Text className="text-[#F1744D] font-medium text-4xl">gametime</Text>
          <View className="w-full flex flex-col items-start gap-4">
            <Text className="text-slate-700 text-2xl font-normal">
              Have an account?
            </Text>
            <LabeledInput
              label="Email"
              placeholder="Email"
              iconLeft={
                <Ionicons name="mail-outline" size={16} color="#717171" />
              }
              value={email}
              onChangeText={setEmail}
            />

            <LabeledInput
              label="Password"
              placeholder="Password"
              iconLeft={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#717171"
                />
              }
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              labelRight={
                <Link href="/">
                  <Text className="text-slate-700 text-xs font-medium underline">
                    Forgot Password?
                  </Text>
                </Link>
              }
            />
          </View>
          {loading ? (
            <ActivityIndicator size={"small"} style={{ margin: 28 }} />
          ) : (
            <Pressable
              className="flex self-stretch py-4 justify-center items-center rounded-lg bg-[#2C2C2C]"
              onPress={handleSignIn}
            >
              <Text className="text-white uppercase">Sign in</Text>
            </Pressable>
          )}
        </KeyboardAvoidingView>
        <View className="flex flex-row justify-center items-center gap-3 self-stretch">
          <View className="flex flex-1 h-px bg-[#AAA]" />
          <Text>Or</Text>
          <View className="flex flex-1 h-px bg-[#AAA]" />
        </View>
        <View className=" self-stretch flex flex-col items-start gap-2">
          <Text className="text-slate-700">
            New here? Create an account in minutes!
          </Text>
          <Link href="/signup" asChild>
            <Pressable className="flex self-stretch py-4 justify-center items-center rounded-lg bg-[#2C2C2C]">
              <Text className="text-white uppercase">Create account</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
