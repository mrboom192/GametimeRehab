import HoldToStartButton from "@/src/components/buttons/HoldToStartButton";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import {
  RoutineSession,
  useRoutineSession,
} from "@/src/contexts/RoutineSessionContext";
import { useConfetti } from "@/src/contexts/ConfettiContext";
import { auth, db } from "@/firebaseConfig";
import {
  doc,
  FieldPath,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "@firebase/firestore";
import { useUser } from "@/src/contexts/UserContext";

const difficultyOptions = [
  { label: "😁 \n Easy", value: "easy" },
  { label: "😌 \n Just right", value: "just-right" },
  { label: "😓 \n Hard", value: "hard" },
];

const repRangeOptions = [
  {
    label: (
      <>
        Completed <Text style={{ color: Colors.red }}>less</Text> than assigned
      </>
    ),
    value: "less",
  },
  {
    label: <>Completed assigned amount</>,
    value: "assigned",
  },
  {
    label: (
      <>
        Completed <Text style={{ color: Colors.green }}>more</Text> than
        assigned
      </>
    ),
    value: "more",
  },
];

const ActiveExercisePage = () => {
  const { routineSession, setRoutineSession } = useRoutineSession();
  const [indicatorHeight, setIndicatorHeight] = useState(0);
  const [overlayShown, setOverlayShown] = useState(false);

  // Starts exercise timer
  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setRoutineSession(
        (prev) =>
          ({
            ...prev,
            timeElapsed: elapsed,
          } as RoutineSession)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // For react native reanimated
  const opacity = useSharedValue(0);

  // Helpful stuff
  const currentExercise =
    routineSession?.exercises?.[routineSession?.currentIndex ?? 0];

  const currentExerciseName = currentExercise?.name ?? "";
  const currentExerciseDescription = currentExercise?.description ?? "";
  const currentExerciseImage = currentExercise?.image_dark ?? "";
  const numberOfExercises = routineSession!.exercises.length;

  const handleShowQuestionnaire = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setOverlayShown(true);
    opacity.value = withTiming(1, { duration: 300 });
  };

  if (!routineSession) {
    // Should never see this
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Text>There is currently no routine session</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Exercise Complete Questionnaire */}
      {overlayShown && (
        <OverlayQuestionnaire
          opacity={opacity}
          setOverlayShown={setOverlayShown}
        />
      )}

      <View
        style={{
          flex: 1,
          paddingHorizontal: 40,
          paddingTop: 16,
          paddingBottom: 32,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Progress indicator */}
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setIndicatorHeight(height);
          }}
          style={{
            position: "absolute",
            left: 16,
            top: 16,
            bottom: 32,
            flexDirection: "column",
            gap: 16,
          }}
        >
          {Array.from({ length: numberOfExercises }).map((_, i) => {
            const isActive = i <= routineSession?.currentIndex!;
            const gap = 16;
            const totalGaps = gap * (numberOfExercises - 1);
            const barHeight =
              numberOfExercises > 0
                ? (indicatorHeight - totalGaps) / numberOfExercises
                : 0;

            return (
              <View
                key={i}
                style={{
                  height: barHeight,
                  width: 4,
                  backgroundColor: isActive ? Colors.primary : Colors.faintGrey,
                  borderRadius: 2,
                }}
              />
            );
          })}
        </View>

        {/* Text stuff */}
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text style={{ fontSize: 36, fontFamily: "dm-sb" }}>
            Exercise {routineSession?.currentIndex! + 1}
          </Text>
          <Text style={{ fontSize: 36, fontFamily: "dm-sb", marginBottom: 16 }}>
            {currentExerciseName}
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "dm" }}>
            {currentExerciseDescription}
          </Text>
        </View>

        {/* Exercise image */}
        <Image
          source={{ uri: currentExerciseImage }}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
        />

        {/* Bottom timer and complete button */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Timer */}
          <Text
            style={{ fontSize: 20, fontFamily: "dm-sb", color: Colors.primary }}
          >
            {formatTime(routineSession?.timeElapsed!)}
          </Text>

          <HoldToStartButton
            onComplete={handleShowQuestionnaire}
            baseColor={Colors.dark}
            text="Hold to complete"
            baseIcon={<></>} // Ewwww
            overlayIcon={<></>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActiveExercisePage;

const OverlayQuestionnaire = ({
  opacity,
  setOverlayShown,
}: {
  opacity: any;
  setOverlayShown: any;
}) => {
  const { routineSession, setRoutineSession } = useRoutineSession();
  const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
  const [selectedRepRange, setSelectedRepRange] = useState<string | null>(null);
  const { playConfetti } = useConfetti();
  const { data } = useUser();

  const numberOfExercises = routineSession!.exercises.length;
  const isLastExercise = routineSession?.currentIndex! === numberOfExercises;

  const incrementCurrentIdx = () => {
    // Do not increment if we are on the last exercise, as that messes things up
    if (!isLastExercise) {
      // Should probably make this a useReducer in the future
      setRoutineSession((prev) => {
        if (!prev) return prev;

        // Reset questionnaire
        setDifficultyLevel(null);
        setSelectedRepRange(null);

        return {
          ...prev,
          currentIndex: prev!.currentIndex + 1,
        };
      });
    }
  };

  useAnimatedReaction(
    () => {
      return opacity.value;
    },
    (currentValue, previousValue) => {
      // Reanimated runs useAnimatedReaction on every animation frame while opacity is animating,
      // so the callback was firing multiple times even when opacity.value stayed near 1.
      // Adding currentValue === 1 && previousValue !== 1 ensures the logic only runs once when opacity first hits 1.
      if (currentValue === 1 && previousValue !== 1) {
        runOnJS(incrementCurrentIdx)();
      }
    }
  );

  // For react native reanimated
  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleCompleteRoutine = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      const uid = auth.currentUser?.uid;
      if (!uid || !routineSession) return;

      const latestSession = {
        ...routineSession,
        endedAt: serverTimestamp(),
        completed: true,
        feedback: {
          ...routineSession.feedback,
          [routineSession.currentIndex - 1]: {
            difficulty: difficultyLevel as "easy" | "just-right" | "hard",
            repRange: selectedRepRange as "less" | "assigned" | "more",
          },
        },
      };

      setRoutineSession(latestSession);

      const activityRef = doc(db, `activities/${routineSession.sessionId}`);

      const currentUser = {
        uid: auth.currentUser?.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        image: data.image,
      };

      const trainer =
        data.trainerId && data.trainer
          ? {
              uid: data.trainerId,
              firstName: data.trainer.first_name,
              lastName: data.trainer.last_name,
              image: data.trainer.image,
            }
          : null;

      const newCompletionActivity: any = {
        type: "completion",
        actor: currentUser,
        actorId: currentUser.uid as string,
        assignees: trainer ? [trainer] : [],
        assigneeIds: trainer ? [trainer.uid] : [],

        // Metadata
        createdAt: serverTimestamp(),

        // Stuff below is specific to routine completion
        routineId: latestSession.sessionId,
        routineName: latestSession.name,
        image: latestSession.image,
        startedAt: latestSession.startedAt,
        endedAt: latestSession.endedAt,
        // timeElapsed: latestSession.timeElapsed,
        completed: latestSession.completed,
        feedback: latestSession.feedback,
        exerciseCount: latestSession.exercises.length,
      };

      await setDoc(activityRef, newCompletionActivity);

      // Reset everything
      setRoutineSession(null);
      setDifficultyLevel(null);
      setSelectedRepRange(null);

      router.dismiss();
      playConfetti();
    } catch (error) {
      console.error("Failed to complete routine:", error);
      // Optional: Show error toast or UI feedback
    }
  };

  const handleDifficultySelect = async (difficulty: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDifficultyLevel(difficulty);
  };

  const handleRepRangeSelect = async (repRange: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedRepRange(repRange);
  };

  const handleCompleteExercise = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setRoutineSession((prev) => {
      if (!prev) return prev;

      const updatedFeedback = {
        ...prev.feedback,
        [prev.currentIndex - 1]: {
          difficulty: difficultyLevel as "easy" | "just-right" | "hard",
          repRange: selectedRepRange as "less" | "assigned" | "more",
        },
      };

      return { ...prev, feedback: updatedFeedback };
    });

    // Hides the modal (need to find a way to hide it first before state updates)
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setOverlayShown)(false);
    });
  };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFF",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        },
        overlayStyle,
      ]}
    >
      <View style={{ width: "66%", flexDirection: "column", gap: 32 }}>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Text
            style={{
              color: Colors.dark,
              fontSize: 24,
              fontFamily: "dm-sb",
            }}
          >
            {isLastExercise ? "Routine" : "Exercise"} Completed!
          </Text>
          <Text
            style={{
              color: Colors.grey2,
              fontSize: 16,
              fontFamily: "dm",
            }}
          >
            Tell us how this exercise felt so we can make adjustments for you in
            the future!
          </Text>
        </View>
        {/* Difficulty selection */}
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Text
            style={{
              color: Colors.dark,
              fontSize: 16,
              fontFamily: "dm-sb",
            }}
          >
            How difficult was it?
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            {difficultyOptions.map((option) => {
              const isSelected = difficultyLevel === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleDifficultySelect(option.value)}
                  style={{
                    paddingVertical: 8,
                    flex: 1,
                    borderWidth: 1,
                    borderColor: Colors.dark,
                    borderRadius: 8,
                    backgroundColor: isSelected ? Colors.dark : "transparent",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontFamily: "dm-sb",
                      color: isSelected ? "#FFF" : Colors.dark,
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        {/* Rep/Range questionnaire */}
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Text
            style={{
              color: Colors.dark,
              fontSize: 16,
              fontFamily: "dm-sb",
            }}
          >
            How close were you to the Set/Rep range assigned to you?
          </Text>
          <View style={{ flexDirection: "column", gap: 16 }}>
            {repRangeOptions.map((option) => {
              const isSelected = selectedRepRange === option.value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleRepRangeSelect(option.value)}
                  style={{
                    paddingVertical: 16,
                    borderWidth: 1,
                    borderColor: Colors.dark,
                    borderRadius: 8,
                    backgroundColor: isSelected ? Colors.dark : "transparent",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontFamily: "dm-sb",
                      color: isSelected ? "#FFF" : Colors.dark,
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLastExercise ? (
            <TouchableOpacity
              style={{
                opacity: selectedRepRange && difficultyLevel ? 1 : 0,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                borderBottomWidth: 1,
                borderColor: Colors.dark,
              }}
              disabled={selectedRepRange && difficultyLevel ? false : true}
              onPress={handleCompleteExercise}
            >
              <Text style={{ fontFamily: "dm-sb" }}>{`Continue to exercise ${
                (routineSession?.currentIndex as number) + 1
              }`}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.dark} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                opacity: selectedRepRange && difficultyLevel ? 1 : 0,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                borderBottomWidth: 1,
                borderColor: Colors.dark,
              }}
              disabled={selectedRepRange && difficultyLevel ? false : true}
              onPress={handleCompleteRoutine}
            >
              <Text
                style={{ fontFamily: "dm-sb" }}
              >{`Complete ${routineSession?.name}`}</Text>
              <Ionicons name="checkmark" size={16} color={Colors.dark} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Pad with zero
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
};
