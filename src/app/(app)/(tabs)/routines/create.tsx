import {
  Text,
  ScrollView,
  View,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Tabs } from "expo-router";
import { Calendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tag from "@/src/components/Tag";
import { format, parse } from "date-fns";
import IconButton from "@/src/components/buttons/IconButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ExerciseCard from "@/src/components/ExerciseCard";
import Weight from "@/src/components/icons/Weight";
import CreateExerciseForm from "@/src/components/CreateExerciseForm";

const CreateRoutine = () => {
  const [selected, setSelected] = useState("");
  const [isDueDateEnabled, setIsDueDateEnabled] = useState(false); // State for the Switch
  const [isCreatingExercise, setIsCreatingExercise] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["95%"], []);

  // callbacks
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const toggleSwitch = () =>
    setIsDueDateEnabled((previousState) => !previousState); // Toggle function

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="flex-col bg-white p-5 gap-8"
      >
        <Tabs.Screen
          options={{
            headerStyle: {
              backgroundColor: "#FFF",
            },
            headerShadowVisible: false,
            headerTitle: (props) => (
              <Text className="text-[#2C2C2C] text-4xl">
                Create New Routine
              </Text>
            ),
          }}
        />

        <View className="flex-col bg-white gap-8">
          {/* Routine Type Tags */}
          <View className="flex flex-col gap-2">
            <Text className="text-[#525252] text-xl">Routine Type</Text>
            <View className="flex flex-row gap-2">
              {[
                { color: "#4B4B4B", text: "REHAB" },
                { color: "#4B4B4B", text: "PREHAB" },
                { color: "#4B4B4B", text: "MISCELLANEOUS" },
              ].map((tag, i) => (
                <Tag key={i} color={tag.color} text={tag.text} />
              ))}
            </View>
          </View>

          {/* Due date selection*/}
          <View className="flex flex-col gap-2">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-[#525252] text-xl">
                Due Date
                {isDueDateEnabled && selected ? (
                  <Text className="text-[#525252] text-xl">
                    {": "}
                    {format(
                      parse(selected, "yyyy-MM-dd", new Date()),
                      "MMMM dd, yyyy"
                    )}
                  </Text>
                ) : (
                  <></>
                )}
              </Text>
              <Switch onValueChange={toggleSwitch} value={isDueDateEnabled} />
            </View>

            {isDueDateEnabled ? (
              <Calendar
                // Customize the appearance of the calendar
                onDayPress={(day: {
                  dateString: React.SetStateAction<string>;
                }) => {
                  setSelected(day.dateString);
                }}
                renderArrow={(direction: string) => (
                  <Ionicons
                    name={
                      direction === "left" ? "chevron-back" : "chevron-forward"
                    }
                    size={20}
                    color="#2C2C2C"
                  />
                )}
                // Specify the current date
                // Callback that gets called when the user selects a day
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: "#2C2C2C",
                  },
                }}
                theme={{
                  backgroundColor: "transparent",
                  calendarBackground: "transparent",
                  selectedDayBackgroundColor: "#00adf5",
                  selectedDayTextColor: "#fff",
                  todayTextColor: "#2d4150",
                }}
              />
            ) : (
              <></>
            )}
          </View>

          {/* Selected Exercises */}
          <View className="flex flex-col gap-2">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-[#525252] text-xl">Selected Exercises</Text>
              <IconButton
                icon={
                  <Ionicons
                    size={16}
                    name={"chevron-forward"}
                    color="#2C2C2C"
                  />
                }
                handlePress={() => handleSnapPress(0)}
                theme="light"
              />
            </View>
            <View className="flex flex-row gap-2">
              {[
                { color: "#4B4B4B", text: "REHAB" },
                { color: "#4B4B4B", text: "PREHAB" },
                { color: "#4B4B4B", text: "MISCELLANEOUS" },
              ].map((tag, i) => (
                <Tag key={i} color={tag.color} text={tag.text} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#2C2C2C" }}
        handleIndicatorStyle={styles.handleIndicator}
        handleStyle={{
          backgroundColor: "#2C2C2C",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }} // hack to fix transparent handle
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View className="flex flex-col self-stretch p-6">
            {/* Conditional Rendering */}
            {isCreatingExercise ? (
              // Create Exercise Screen
              <View className="flex flex-col justify-center items-start">
                {/* Add form fields or content for creating an exercise */}
                <CreateExerciseForm
                  setIsCreatingExercise={setIsCreatingExercise}
                />
              </View>
            ) : (
              // Select Exercises Screen
              <View className="flex flex-col justify-between items-start">
                <Text className="text-4xl text-white font-medium">
                  Select Exercises
                </Text>
                <ExerciseCard backgroundColor="#1D1D1D" />
                {/* Create Exercise Button */}
                <TouchableOpacity
                  onPress={() => setIsCreatingExercise(true)}
                  className="mt-4 bg-orange-400 p-3 rounded-lg"
                >
                  <Text className="text-white font-medium">
                    Create Exercise
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: "#fff",
    width: 128,
    marginTop: 8,
    marginBottom: 2,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#2C2C2C",
  },
});
export default CreateRoutine;
