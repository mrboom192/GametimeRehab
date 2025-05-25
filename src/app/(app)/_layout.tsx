import { Text, TouchableOpacity, View } from "react-native";
import { Redirect, router, Stack } from "expo-router";
import { useSession } from "@/src/contexts/AuthContext";
import { auth, db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";
import { TextSemiBold } from "@/src/components/StyledText";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useUser } from "@/src/contexts/UserContext";

export default function AppLayout() {
  const { signOut, session, isLoading } = useSession();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { data } = useUser();

  // Move this to a scheduled firebase function (costs $$$)
  useEffect(() => {
    const resetStreakForUser = async (uid: string) => {
      try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          currentStreak: 0,
        });
        console.log("Streak reset for user:", uid);
      } catch (error) {
        console.error("Error resetting streak:", error);
      }
    };

    // Reset streak if the user has done nothing for a day
    if (isAuthReady && session) {
      const currentDate = Timestamp.now().toDate();
      const lastActiveDate = data?.lastActivityDate?.toDate();

      if (!lastActiveDate) return;

      // Compare currentDate and lastActiveDate
      const oneDayMillis = 24 * 60 * 60 * 1000;

      const timeDifference = currentDate.getTime() - lastActiveDate.getTime();

      if (timeDifference > oneDayMillis) {
        // More than 1 day has passed since last activity, reset streak
        // You can call a function to update Firestore here
        resetStreakForUser(data.uid);
      }
    }
  }, [isAuthReady, session, data?.lastActivityDate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading || !isAuthReady) {
    return <TextSemiBold>Loading...</TextSemiBold>;
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
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
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
              <TextSemiBold
                style={{
                  color: Colors.dark,
                  fontSize: 16,
                }}
              >
                Exercise Details
              </TextSemiBold>
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
              <TextSemiBold
                style={{
                  color: Colors.dark,
                  fontSize: 16,
                }}
              >
                Create Routine
              </TextSemiBold>
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
              <TextSemiBold
                style={{
                  color: Colors.dark,
                  fontSize: 16,
                }}
              >
                Assign to Athletes
              </TextSemiBold>
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
      <Stack.Screen
        name="(profile)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
