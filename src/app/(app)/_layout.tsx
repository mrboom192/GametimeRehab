import { Text, TouchableOpacity, View } from "react-native";
import { Redirect, router, Stack } from "expo-router";
import { useSession } from "@/src/contexts/AuthContext";
import { auth } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";

export default function AppLayout() {
  const { signOut, session, isLoading } = useSession();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading || !isAuthReady) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session || !auth.currentUser) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    signOut();
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack screenOptions={{ navigationBarColor: "#FFF" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/exercise"
        options={{
          presentation: "modal",
          title: "Exercise Details",
          header: () => (
            <View
              style={{
                position: "relative",
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderBottomWidth: 1,
                borderColor: Colors.faintGrey,
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", left: 16 }}
                onPress={() => router.back()}
              >
                <Ionicons name="close-outline" color={Colors.dark} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.dark,
                  fontFamily: "dm-sb",
                  fontSize: 16,
                }}
              >
                Exercise Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/cart"
        options={{
          presentation: "modal",
          title: "Create Routine",
          header: () => (
            <View
              style={{
                position: "relative",
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderBottomWidth: 1,
                borderColor: Colors.faintGrey,
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", left: 16 }}
                onPress={() => router.back()}
              >
                <Ionicons name="close-outline" color={Colors.dark} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.dark,
                  fontFamily: "dm-sb",
                  fontSize: 16,
                }}
              >
                Create Routine
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/assign"
        options={{
          presentation: "modal",
          title: "Assign to Athletes",
          header: () => (
            <View
              style={{
                position: "relative",
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderBottomWidth: 1,
                borderColor: Colors.faintGrey,
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", left: 16 }}
                onPress={() => router.back()}
              >
                <Ionicons name="close-outline" color={Colors.dark} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.dark,
                  fontFamily: "dm-sb",
                  fontSize: 16,
                }}
              >
                Assign to Athletes
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="routine/[id]"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 9999,
                backgroundColor: "#FFF",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" color={Colors.dark} size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="routine/active"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
