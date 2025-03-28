import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { useUser } from "@/src/contexts/UserContext";
import { StatusBar } from "expo-status-bar";

export default function FirstWelcome() {
  const { data } = useUser();
  const router = useRouter();

  const handleNext = () => {
    router.replace("/");
  };

  // TODO:
  // Routine and Exercise Creation
  // Exercise Flow
  // Post Session Survey

  return (
    <View className="flex-1 bg-white items-center">
      <StatusBar style="dark" backgroundColor="#FFF" />

      <Stack.Screen
        options={{
          gestureEnabled: false,
          navigationBarColor: "#FFF",
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "center",
        }}
      />
      <View className="flex-1 flex flex-col self-stretch justify-between items-start mx-8 mt-8 mb-16">
        {/* Animate this later */}
        <View className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FEF5EF] rounded-full flex items-center justify-center" />
        <View className="top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full flex items-center justify-center">
          <View className="flex flex-col w-3/4 items-center gap-4 px-6">
            {data && data?.type === "trainer" ? (
              <Text className="text-[#2C2C2C] text-4xl">
                We're here to assist you in{" "}
                <Text className="text-[#F1744D] text-4xl font-bold">
                  empowering athletes
                </Text>{" "}
                in their recovery journey!
                {"\n\n"}
                let’s get started!
              </Text>
            ) : (
              <Text className="text-[#2C2C2C] text-4xl">
                You just took the{" "}
                <Text className="text-[#F1744D] text-4xl font-bold">
                  first step
                </Text>{" "}
                to owning your own recovery journey!
                {"\n\n"}
                let’s get started!
              </Text>
            )}
          </View>
        </View>

        <View className="flex flex-row items-center justify-end self-stretch gap-6">
          <Pressable
            className="py-2.5 px-6 justify-center flex flex-row flex-1 items-center rounded-lg bg-[#2C2C2C] border gap-2"
            onPress={handleNext}
          >
            <Text className="text-white uppercase">Continue to home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
