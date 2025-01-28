import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import PairForm from "@/src/components/PairForm";
import { useUser } from "@/src/contexts/UserContext";

const Pair = () => {
  const { userInfo } = useUser();

  return (
    <SafeAreaView className="flex-1 flex-col bg-white p-5 gap-4">
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text className="text-[#2C2C2C] text-4xl">Pair</Text>
          ),
        }}
      />

      {userInfo?.type === "athlete" ? (
        <>
          <PairForm />
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Pair;
