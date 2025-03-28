import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import PairForm from "@/src/components/PairForm";
import { useUser } from "@/src/contexts/UserContext";
import Colors from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Avatar from "@/src/components/Avatar";

const Pair = () => {
  const { userInfo } = useUser();

  const handleAccept = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleReject = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View className="flex-1 flex-col bg-white p-5 gap-4">
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
      <View style={{ flex: 1, padding: 16 }}>
        {userInfo?.type === "athlete" ? (
          <PairForm />
        ) : (
          <View>
            <Text
              style={{ fontFamily: "dm-sb", fontSize: 20, marginBottom: 24 }}
            >
              Trainer Code: {userInfo.trainer_code}
            </Text>

            <Text style={{ fontFamily: "dm-sb", fontSize: 20 }}>
              {userInfo.pending_requests.length} Pairing{" "}
              {userInfo.pending_requests.length === 1 ? "Request" : "Requests"}
            </Text>
            {userInfo.pending_requests.map((athlete: any) => (
              <View
                style={{
                  paddingVertical: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.faintGrey,
                }}
              >
                {/* User info */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    initials={`${athlete.first_name[0]}${athlete.last_name[0]}`}
                    uri={athlete.image}
                    size={40}
                  />
                  <Text style={{ fontFamily: "dm-sb", fontSize: 16 }}>
                    {athlete.first_name} {athlete.last_name}
                  </Text>
                </View>

                {/* Buttons */}
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor: Colors.dark,
                      borderRadius: 9999,
                    }}
                    onPress={() => handleAccept()}
                  >
                    <Ionicons name="checkmark" color={"#FFF"} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor: Colors.red,
                      borderRadius: 9999,
                    }}
                    onPress={() => handleReject()}
                  >
                    <Ionicons name="trash-outline" color={"#FFF"} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Pair;
