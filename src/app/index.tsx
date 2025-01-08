import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "../components/LabeledInput";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Sign in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex flex-col justify-between items-start mx-8 mt-8 mb-16">
        <KeyboardAvoidingView
          className="flex flex-col items-center justify-center gap-8"
          behavior="padding"
        >
          <View className="w-full flex flex-col items-start gap-4">
            <Text className="text-slate-700 text-2xl font-normal">
              Have an account?
            </Text>
            <LabeledInput
              label="Email"
              placeholder="Email"
              icon={<Ionicons name="mail-outline" size={16} color="#717171" />}
              value={email}
              onChangeText={setEmail}
            />

            <LabeledInput
              label="Password"
              placeholder="Password"
              icon={
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
              onPress={signIn}
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
    </View>
  );
}
