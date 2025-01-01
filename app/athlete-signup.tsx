import {
  View,
  TextInput,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import React from "react";
import firestore from "@react-native-firebase/firestore";

export default function Index() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Save user details to Firestore
      await firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        name: name,
        email: user.email,
        role: "athlete", // Assign role as athlete
        createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp of registration
      });

      alert("User registered successfully!");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
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
          Register as an athlete
        </Text>
        <View className="w-1/2 flex flex-col gap-4">
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
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
          <Pressable
            className="px-5 py-3 flex-row items-center justify-center rounded-[10px] bg-blue-500"
            onPress={signUp}
          >
            <Text className="text-white font-bold">Sign up</Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
