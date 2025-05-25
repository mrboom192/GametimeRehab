import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { TextRegular } from "@/src/components/StyledText";
import LabeledInput from "@/src/components/LabeledInput";
import { useUser } from "@/src/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/src/components/buttons/BackButton";

const AccountInfo = () => {
  const { data } = useUser();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFF" }}
      contentContainerStyle={{
        flexDirection: "column",
        backgroundColor: "#FFF",
        padding: 16,
        paddingBottom: 128,
        gap: 8,
      }}
      overScrollMode="never" // android only
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: () => (
            <TextRegular style={{ color: "#2C2C2C", fontSize: 24 }}>
              Account Info
            </TextRegular>
          ),
          headerLeft: () => <BackButton />,
        }}
      />

      {/* First Name and Last Name */}
      <View className="flex flex-col gap-4">
        <LabeledInput
          label="First name"
          placeholder="John"
          value={data.first_name}
          editable={false}
        />
        <LabeledInput
          label="Last name"
          placeholder="Smith"
          value={data.last_name}
          editable={false}
        />
      </View>

      {/* Email */}
      <LabeledInput
        label="Email"
        placeholder="example@example.com"
        value={data.email}
        iconLeft={<Ionicons name="mail-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* Phone Number */}
      <LabeledInput
        label="Phone number (optional)"
        placeholder="(123) 555-7890"
        value={data.phone || "No phone number"}
        iconLeft={<Ionicons name="call-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* FAFSA */}
      <LabeledInput
        label="Institution FAFSA code"
        placeholder="123456"
        value={data.institution_code}
        iconLeft={<Ionicons name="school-outline" size={16} color="#717171" />}
        editable={false}
      />

      {/* Program/Sport */}
      <LabeledInput
        label="Program/Sport"
        placeholder="Wrestling, Track, Football, etc..."
        value={data.sport || "Not specified"}
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
        value={data.position || "Not specified"}
        editable={false}
      />

      {/* System of Measurement */}
      <View className="flex flex-row gap-2">
        <LabeledInput
          label="System of Measurement"
          placeholder="Metric/Imperial"
          value={data.system_of_measurement || "Not specified"}
          editable={false}
        />
      </View>

      {/* Weight */}
      <LabeledInput
        label="Weight"
        placeholder="000"
        value={
          data.system_of_measurement === "imperial"
            ? `${data.weight_value || "N/A"} Pounds`
            : `${data.weight_value || "N/A"} Kilograms`
        }
        editable={false}
      />

      {/* Height */}
      <LabeledInput
        label="Height"
        placeholder="000"
        value={
          data.system_of_measurement === "imperial"
            ? `${data.height_feet || "0"}' ${data.height_inches || "0"}"`
            : `${data.height_cm || "0"} cm`
        }
        editable={false}
      />

      {/* Gender */}
      <LabeledInput
        label="Gender"
        placeholder="Male/Female"
        value={data.gender || "Not specified"}
        editable={false}
      />
    </ScrollView>
  );
};

export default AccountInfo;
