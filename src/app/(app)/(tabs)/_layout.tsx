import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: "#F1744D" }} />;
}
