import { TabBar } from "@/src/components/TabBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ tabBarActiveTintColor: "#F1744D" }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="routines"
        options={{ title: "Routines", headerShown: false }}
      />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />
    </Tabs>
  );
}
