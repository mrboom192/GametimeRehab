import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useRoutineSession } from "@/src/contexts/RoutineSessionContext";

const ActiveExercisePage = () => {
  const { routineSession, setRoutineSession } = useRoutineSession();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 32 }}>
        <Text>Exercise {(routineSession?.currentIndex! + 1).toString()}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ActiveExercisePage;
