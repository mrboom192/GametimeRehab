import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import PageHeader from "@/src/components/PageHeader";

const ProfilePageRootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="add-injury"
        options={{
          title: "Add injury",
          header: (props) => <PageHeader {...props} />,
        }}
      />
    </Stack>
  );
};

export default ProfilePageRootLayout;
