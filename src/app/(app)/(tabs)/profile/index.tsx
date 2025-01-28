import { Text, ScrollView, SafeAreaView, View, Pressable } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useUser } from "@/src/contexts/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "@/src/components/LabeledInput";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import IconButton from "@/src/components/buttons/IconButton";
import { useSession } from "@/src/contexts/AuthContext";

const Profile = () => {
  const { userInfo } = useUser();
  const { signOut } = useSession();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerClassName="flex-col bg-white p-5 gap-8"
      overScrollMode="never" // android only
    >
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text className="text-[#2C2C2C] text-4xl">Account Info</Text>
          ),
          headerRight: () => (
            <IconButton
              icon={
                <Ionicons size={24} name={"log-out-outline"} color="#f56565" />
              }
              handlePress={() => signOut()}
              theme="light"
            />
          ),
        }}
      />
      {/* First Name and Last Name */}
      <View className="flex flex-col gap-4">
        <LabeledInput
          label="First name"
          placeholder="John"
          value={userInfo.first_name}
          editable={false}
        />
        <LabeledInput
          label="Last name"
          placeholder="Smith"
          value={userInfo.last_name}
          editable={false}
        />
      </View>

      {/* Email */}
      <LabeledInput
        label="Email"
        placeholder="example@example.com"
        value={userInfo.email}
        iconLeft={<Ionicons name="mail-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* Phone Number */}
      <LabeledInput
        label="Phone number (optional)"
        placeholder="(123) 555-7890"
        value={userInfo.phone || "No phone number"}
        iconLeft={<Ionicons name="call-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* FAFSA */}
      <LabeledInput
        label="Institution FAFSA code"
        placeholder="123456"
        value={userInfo.institution_code}
        iconLeft={<Ionicons name="school-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* Program/Sport */}
      <LabeledInput
        label="Program/Sport"
        placeholder="Wrestling, Track, Football, etc..."
        value={userInfo.sport || "Not specified"}
        iconLeft={
          <Ionicons
            name="american-football-outline"
            size={16}
            color="#717171"
          />
        }
        editable={false}
      />

      {/* Position/Weight class */}
      <LabeledInput
        label="Position/Weight class"
        placeholder="Quarter Back, Striker, Right Back, etc..."
        value={userInfo.position || "Not specified"}
        editable={false}
      />

      {/* System of Measurement */}
      <View className="flex flex-row gap-2">
        <LabeledInput
          label="System of Measurement"
          placeholder="Metric/Imperial"
          value={userInfo.system_of_measurement || "Not specified"}
          editable={false}
        />
      </View>

      {/* Weight */}
      <LabeledInput
        label="Weight"
        placeholder="000"
        value={
          userInfo.system_of_measurement === "imperial"
            ? `${userInfo.weight_value || "N/A"} Pounds`
            : `${userInfo.weight_value || "N/A"} Kilograms`
        }
        editable={false}
      />

      {/* Height */}
      <LabeledInput
        label="Height"
        placeholder="000"
        value={
          userInfo.system_of_measurement === "imperial"
            ? `${userInfo.height_feet || "0"}' ${
                userInfo.height_inches || "0"
              }"`
            : `${userInfo.height_cm || "0"} cm`
        }
        editable={false}
      />

      {/* Gender */}
      <LabeledInput
        label="Gender"
        placeholder="Male/Female"
        value={userInfo.gender || "Not specified"}
        editable={false}
      />

      <View className="mb-32">
        <NavigateButton
          href="/profile/pair"
          title="pair with trainer"
          theme="dark"
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
