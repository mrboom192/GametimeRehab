import { TabBar } from "@/src/components/TabBar/TabBar";
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";

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
      <Tabs.Screen
        name="progress"
        options={{ title: "Progress", headerShown: false }}
      />
    </Tabs>
  );
}
