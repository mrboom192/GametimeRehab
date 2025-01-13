import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

interface TrainerAthletesProps {
  trainerUid: string; // Pass the trainer's UID as a prop
}

const TrainerAthletes: React.FC<TrainerAthletesProps> = ({ trainerUid }) => {
  const [athletes, setAthletes] = useState<any[]>([]); // State to store athletes
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const getTrainerAthletes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch trainer's document
      const trainerDoc = await firestore()
        .collection("users")
        .doc(trainerUid)
        .get();

      if (!trainerDoc.exists) {
        setError("Trainer not found");
        return;
      }

      const trainerData = trainerDoc.data();
      const athleteIds = trainerData?.athlete_ids || [];

      // Fetch athlete data
      const athletesData = await Promise.all(
        athleteIds.map(async (athleteUid: string) => {
          const athleteDoc = await firestore()
            .collection("users")
            .doc(athleteUid)
            .get();
          return athleteDoc.exists ? athleteDoc.data() : null;
        })
      );

      // Filter out null values (for non-existent athletes)
      setAthletes(athletesData.filter(Boolean));
    } catch (error) {
      console.error("Error retrieving trainer's athletes:", error);
      setError("Failed to load athletes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch athletes on component mount
  useEffect(() => {
    if (trainerUid) {
      getTrainerAthletes();
    }
  }, [trainerUid]);

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
        Trainer Athletes:
      </Text>
      {athletes.length === 0 ? (
        <Text>No athletes found.</Text>
      ) : (
        <FlatList
          data={athletes}
          keyExtractor={(item, index) => item.uid || index.toString()}
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
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TrainerAthletes;
