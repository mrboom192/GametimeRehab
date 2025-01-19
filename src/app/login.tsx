import React from "react";
import { ActivityIndicator, View } from "react-native";
import SignIn from "../components/screens/SignIn"; // Import SignIn
import { useUser } from "../contexts/UserContext"; // Import UserContext

export default function Login() {
  const { loading, initializing } = useUser(); // Assume useUser provides a loading state

  if (loading || initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      </View>
    );
  }

  return <SignIn />;
}
