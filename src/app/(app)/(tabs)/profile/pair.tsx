import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import PairForm from "@/src/components/PairForm";
import { useUser } from "@/src/contexts/UserContext";
import Colors from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Avatar from "@/src/components/Avatar";
import {
  arrayRemove,
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "@firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import uuid from "react-native-uuid";

const Pair = () => {
  const { data, setData } = useUser();
  const [loading, setLoading] = useState(false);

  const handleAccept = async (athlete: any) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (!auth.currentUser?.uid) return; // Just in case

    try {
      setLoading(true);

      // Use Firestore batch to atomically update both trainer and athlete documents
      const batch = writeBatch(db);

      // Remove athlete from `pendingRequests` and add to `athleteIds`
      batch.update(doc(db, "users", data.uid), {
        pending_requests: arrayRemove(athlete),
        athletes: arrayUnion(athlete),
      });

      // Update athlete's `trainerId`
      batch.update(doc(db, "users", athlete.uid), {
        trainer: {
          first_name: data.first_name,
          last_name: data.last_name,
          image: data.image,
          uid: data.uid,
        },
        trainerId: data.uid,
      });

      await batch.commit();

      // If no error, the line below will run. Otherwise, will run the catch block
      // We'll perform optimistic updates to trainer state.
      setData((prev: any) => ({
        ...prev,
        pending_requests: prev.pending_requests.filter(
          (req: any) => req.uid !== athlete.uid
        ),
        athletes: [...prev.athletes, athlete],
      }));

      const pairId = uuid.v4();

      const activityRef = doc(db, `activities/${pairId}`);

      // Only trainer can confirm pairing
      const currentUser = {
        uid: auth.currentUser?.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        image: data.image,
      };

      // We dont have to do this, but just in case we change something in the future
      const formattedAthlete = {
        uid: athlete.uid,
        firstName: athlete.first_name,
        lastName: athlete.last_name,
        image: athlete.image,
      };

      const newPairActivity: any = {
        type: "pair",
        actor: currentUser,
        actorId: currentUser.uid as string,
        assignees: formattedAthlete ? [formattedAthlete] : [],
        assigneeIds: formattedAthlete ? [formattedAthlete.uid] : [],

        // Metadata
        createdAt: serverTimestamp(),
      };

      await setDoc(activityRef, newPairActivity);
    } catch (err) {
      console.error("Error accepting athlete request:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (athlete: any) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      setLoading(true);

      // Remove athlete from `pendingRequests`
      await updateDoc(doc(db, "users", data.uid), {
        pending_requests: arrayRemove(athlete),
      });

      // If no error, the line below will run. Otherwise, will run the catch block
      // We'll perform optimistic updates to trainer state.
      setData((prev: any) => ({
        ...prev,
        pending_requests: prev.pending_requests.filter(
          (req: any) => req.uid !== athlete.uid
        ),
      }));
    } catch (err) {
      console.error("Error rejecting athlete request:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 flex-col bg-white p-5 gap-4">
        <Text>Loading...</Text>
      </View>
    );
  }

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
        {data?.type === "athlete" ? (
          <PairForm />
        ) : (
          <View>
            <Text
              style={{ fontFamily: "dm-sb", fontSize: 20, marginBottom: 24 }}
            >
              Trainer Code: {data.trainer_code}
            </Text>

            <Text style={{ fontFamily: "dm-sb", fontSize: 20 }}>
              {data.pending_requests?.length || 0} Pairing{" "}
              {(data.pending_requests?.length || 0) === 1
                ? "Request"
                : "Requests"}
            </Text>
            {data.pending_requests.map((athlete: any) => (
              <View
                style={{
                  paddingVertical: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.faintGrey,
                }}
                key={athlete.uid}
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
                    onPress={() => handleAccept(athlete)}
                    disabled={loading}
                  >
                    <Ionicons name="checkmark" color={"#FFF"} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor: Colors.red,
                      borderRadius: 9999,
                    }}
                    onPress={() => handleReject(athlete)}
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
