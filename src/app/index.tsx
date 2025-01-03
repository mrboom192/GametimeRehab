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
    <View className="flex-1 bg-white items-center justify-center gap-12">
      <KeyboardAvoidingView
        className="w-full flex flex-col items-center gap-4"
        behavior="padding"
      >
        <Text className="text-slate-700 font-bold text-3xl w-3/4 text-center">
          Welcome to Gametime Rehab!
        </Text>
        <View className="w-1/2 flex flex-col gap-4">
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {loading ? (
          <ActivityIndicator size={"small"} style={{ margin: 28 }} />
        ) : (
          <>
            <Pressable
              className="px-5 py-3 flex-row items-center justify-center rounded-[10px] bg-blue-500"
              onPress={signIn}
            >
              <Text className="text-white font-bold">Login</Text>
            </Pressable>
            <View className="flex flex-row gap-1">
              <Text>New to Gametime Rehab?</Text>
              <Link href="/signup">
                <Text className="text-blue-500 font-bold underline">
                  Sign Up!
                </Text>
              </Link>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
