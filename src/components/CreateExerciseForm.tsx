import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import LabeledInput from "./LabeledInput";
import Tag from "./Tag";
import { Picker } from "@react-native-picker/picker";

// Define types for the props
interface CreateExerciseFormProps {}

const CreateExerciseForm: React.FC<CreateExerciseFormProps> = ({}) => {
  const [workoutName, setWorkoutName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [numSets, setNumSets] = useState<string | undefined>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");

  const handleTagPress = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag)); // Toggle selection
    console.log(tag);
  };

  // Determine the text color based on difficulty
  const getTextColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500"; // Tailwind class for green text
      case "moderate":
        return "text-orange-500"; // Tailwind class for orange text
      case "challenging":
        return "text-red-500"; // Tailwind class for red text
      default:
        return "text-white"; // Default to white text
    }
  };

  return (
    <View className="flex flex-col self-stretch gap-4">
      <View className="flex flex-row justify-between items-start self-stretch">
        {/* Routine Type Tags */}
        <View className="flex flex-col gap-4">
          <Text className="text-white font-medium" style={{ fontSize: 16 }}>
            Workout Type
          </Text>
          <View className="flex flex-row gap-2">
            {[
              { color: "#4B4B4B", text: "rehab" },
              { color: "#4B4B4B", text: "prehab" },
              { color: "#4B4B4B", text: "miscellaneous" },
            ].map((tag, i) => (
              <Tag
                key={i}
                color={tag.color}
                text={tag.text}
                selected={selectedTag === tag.text}
                handlePress={() => handleTagPress(tag.text)}
              />
            ))}
          </View>
        </View>
        <View className="flex flex-col">
          <Text className="text-white font-medium" style={{ fontSize: 16 }}>
            Difficulty
          </Text>

          <Text className={`capitalize ${getTextColor(selectedDifficulty)}`}>
            {selectedDifficulty}
          </Text>
          <Picker
            selectedValue={selectedDifficulty}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDifficulty(itemValue)
            }
            dropdownIconColor="#FFF"
            dropdownIconRippleColor="#444"
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Moderate" value="moderate" />
            <Picker.Item label="Challenging" value="challenging" />
          </Picker>
        </View>
      </View>
      <LabeledInput
        label="Workout"
        placeholder="Exercise name"
        value={workoutName}
        theme="dark"
        labelStyle={{ color: "#FFF", fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: "#222222" }}
        onChangeText={(text) => setWorkoutName(text)}
      />
      {/* Sets Input */}
      <View className="w-24">
        <LabeledInput
          placeholder="0"
          unit="Sets"
          value={numSets}
          onChangeText={(text) => setNumSets(text)}
          keyboardType="numeric"
          theme="dark"
          labelStyle={{ color: "#FFF", fontSize: 16 }}
          inputContainerStyle={{ backgroundColor: "#222222" }}
        />
      </View>
      {/* Reps Input */}
      <View className="w-24">
        <LabeledInput
          placeholder="0"
          unit="Reps"
          value={numSets}
          onChangeText={(text) => setNumSets(text)}
          keyboardType="numeric"
          theme="dark"
          labelStyle={{ color: "#FFF", fontSize: 16 }}
          inputContainerStyle={{ backgroundColor: "#222222" }}
        />
      </View>
      <LabeledInput
        label="Exercise instructions"
        placeholder="Write instructions, comments, or notes here..."
        value={instructions}
        theme="dark"
        labelStyle={{ color: "#FFF", fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: "#222222" }}
        onChangeText={(text) => setInstructions(text)}
        multiline={true}
        numberOfLines={12}
      />
    </View>
  );
};

export default CreateExerciseForm;
