import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Button,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

interface PendingAthleteRequestsProps {
  trainerUid: string; // Pass the trainer's UID as a prop
}

const PendingAthleteRequests: React.FC<PendingAthleteRequestsProps> = ({
  trainerUid,
}) => {
  const [athletes, setAthletes] = useState<any[]>([]); // State to store athletes
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch pending requests on component mount
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch trainer's document
        const trainerDoc = await firestore()
          .collection("users")
          .doc(trainerUid)
          .get();

        if (!trainerDoc.exists) {
          setError("Trainer not found.");
          setLoading(false);
          return;
        }

        const trainerData = trainerDoc.data();
        const pendingRequests = trainerData?.pending_requests || [];

        // Fetch details for each athlete in `pendingRequests`
        const athletesData = await Promise.all(
          pendingRequests.map(async (athleteUid: string) => {
            const athleteDoc = await firestore()
              .collection("users")
              .doc(athleteUid)
              .get();
            return athleteDoc.exists ? athleteDoc.data() : null;
          })
        );

        setAthletes(athletesData.filter(Boolean)); // Remove null entries
      } catch (err) {
        console.error("Error fetching pending requests:", err);
        setError("Failed to load pending requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [trainerUid]);

  // Accept an athlete's request
  const handleAccept = async (athleteUid: string) => {
    try {
      setLoading(true);

      const trainerRef = firestore().collection("users").doc(trainerUid);
      const athleteRef = firestore().collection("users").doc(athleteUid);

      // Use Firestore batch to atomically update both trainer and athlete documents
      const batch = firestore().batch();

      // Remove athlete from `pendingRequests` and add to `athleteIds`
      batch.update(trainerRef, {
        pending_requests: firestore.FieldValue.arrayRemove(athleteUid),
        athlete_ids: firestore.FieldValue.arrayUnion(athleteUid),
      });

      // Update athlete's `trainerId`
      batch.update(athleteRef, {
        trainer_id: trainerUid,
      });

      await batch.commit();

      Alert.alert("Success", "Athlete has been accepted.");
      setAthletes((prev) =>
        prev.filter((athlete) => athlete.uid !== athleteUid)
      );
    } catch (err) {
      console.error("Error accepting athlete request:", err);
      Alert.alert("Error", "Failed to accept the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reject an athlete's request
  const handleReject = async (athleteUid: string) => {
    try {
      setLoading(true);

      const trainerRef = firestore().collection("users").doc(trainerUid);

      // Remove athlete from `pendingRequests`
      await trainerRef.update({
        pending_requests: firestore.FieldValue.arrayRemove(athleteUid),
      });

      Alert.alert("Success", "Athlete has been rejected.");
      setAthletes((prev) =>
        prev.filter((athlete) => athlete.uid !== athleteUid)
      );
    } catch (err) {
      console.error("Error rejecting athlete request:", err);
      Alert.alert("Error", "Failed to reject the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-1 flex-col">
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Pending Athlete Requests:
      </Text>
      {athletes.length === 0 ? (
        <Text>No pending requests found.</Text>
      ) : (
        <FlatList
          data={athletes}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                marginVertical: 8,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#ccc",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.first_name} {item.last_name}
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>{item.email}</Text>
              <View style={{ flexDirection: "row", marginTop: 8, gap: 8 }}>
                <Button
                  title="Accept"
                  onPress={() => handleAccept(item.uid)}
                  color="green"
                />
                <Button
                  title="Reject"
                  onPress={() => handleReject(item.uid)}
                  color="red"
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PendingAthleteRequests;
