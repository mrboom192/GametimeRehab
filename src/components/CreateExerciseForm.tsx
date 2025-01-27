import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import LabeledInput from "./LabeledInput";
import Tag from "./Tag";
import IconButton from "./buttons/IconButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import RangeSlider from "rn-range-slider";
import Thumb from "./slider/Thumb";
import Rail from "./slider/Rail";
import RailSelected from "./slider/RailSelected";
import Label from "./slider/Label";
import Notch from "./slider/Notch";
import Weight from "./icons/Weight";

import injuries from "../../assets/data/injuries.json";
import InjuryCard from "./InjuryCard";

// Define types for the props
interface GeneralExerciseInfoFormProps {
  formState: {
    workoutName: string;
    instructions: string;
    injury: string;
    selectedTag: string | null;
    selectedRegion: string | null; // Updated for dynamic region selection
    selectedType: string | null; // Updated for injury type selection
    numSets: string | undefined;
    selectedDifficulty: string;
    low: number;
    high: number;
  };
  updateFormState: (
    key: keyof GeneralExerciseInfoFormProps["formState"],
    value: any
  ) => void;
}

interface CreateExerciseFormProps {
  setIsCreatingExercise: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateExerciseForm: React.FC<CreateExerciseFormProps> = ({
  setIsCreatingExercise,
}) => {
  const [formState, setFormState] = useState({
    workoutName: "",
    instructions: "",
    injury: "",
    selectedTag: null,
    selectedRegion: null, // Updated for region
    selectedType: null, // Updated for injury type
    numSets: "0",
    selectedDifficulty: "easy",
    low: 0,
    high: 20,
  });

  // Helper function to update state
  const updateFormState = (key: keyof typeof formState, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Helper function to update tag state
  const updateInjuryTag = (key: keyof typeof formState, value: any) => {
    if (key === "selectedRegion") {
      setFormState((prevState) => ({
        ...prevState,
        selectedType: null, // Reset selectedType when region changes
        [key]: value,
      }));

      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [currentPage, setCurrentPage] = useState(0); // Track current page

  const pages = [
    // First page: Form
    <GeneralExerciseInfoForm
      formState={formState}
      updateFormState={updateFormState}
    />,

    // Page two
    <View>
      <View className="flex flex-row self-stretch justify-start items-center gap-3 mb-4 ">
        <Text
          numberOfLines={1} // Need this to truncate
          className="text-4xl flex-1 text-white font-medium text-ellipsis overflow-hidden"
        >
          {"What injury does this treat?"}
        </Text>
      </View>
      <InjurySelector formState={formState} updateInjuryTag={updateInjuryTag} />
    </View>,
  ];

  return (
    <View className="flex flex-1 justify-center items-center">
      {pages[currentPage]}

      {/* Navigation Controls */}
      <View className="flex flex-row justify-between mt-4 w-full px-4">
        {currentPage === 0 ? (
          <TouchableOpacity
            onPress={() => setIsCreatingExercise(false)}
            className="mt-4 bg-orange-400 p-3 rounded-lg"
          >
            <Text className="text-white font-medium">Back</Text>
          </TouchableOpacity>
        ) : (
          <Button
            title="Previous"
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          />
        )}

        <Button
          title="Next"
          onPress={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))
          }
          disabled={currentPage === pages.length - 1}
        />
      </View>
    </View>
  );
};

export default CreateExerciseForm;

const GeneralExerciseInfoForm: React.FC<GeneralExerciseInfoFormProps> = ({
  formState,
  updateFormState,
}) => {
  const getRepRange = () => {
    if (formState.low === 0 && formState.high === 20)
      return "Any number of reps";
    if (formState.low === formState.high) return `${formState.low} Reps`;
    return `${formState.low}-${formState.high} Reps`;
  };

  const getTextColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500";
      case "moderate":
        return "text-orange-500";
      case "challenging":
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  const renderThumb = useCallback(() => <Thumb name={"low"} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    []
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    updateFormState("low", low);
    updateFormState("high", high);
  }, []);

  const incrementDifficulty = () => {
    const difficultyLevels = ["easy", "moderate", "challenging"];
    updateFormState(
      "selectedDifficulty",
      difficultyLevels[
        Math.min(
          difficultyLevels.indexOf(formState.selectedDifficulty) + 1,
          difficultyLevels.length - 1
        )
      ]
    );
  };

  const decrementDifficulty = () => {
    const difficultyLevels = ["easy", "moderate", "challenging"];
    updateFormState(
      "selectedDifficulty",
      difficultyLevels[
        Math.max(difficultyLevels.indexOf(formState.selectedDifficulty) - 1, 0)
      ]
    );
  };

  return (
    <View className="flex flex-col flex-1 self-stretch gap-4">
      {/* Truncating exercise title */}
      <View className="flex flex-row self-stretch justify-start items-center gap-3 mb-4 ">
        <Weight color="#666" size={40} />
        <Text
          numberOfLines={1} // Need this to truncate
          className="text-4xl flex-1 text-white font-medium text-ellipsis overflow-hidden"
        >
          {formState.workoutName || "New Exercise"}
        </Text>
      </View>

      <LabeledInput
        label="Workout"
        placeholder="Exercise name"
        value={formState.workoutName}
        theme="dark"
        labelStyle={{ color: "#FFF", fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: "#222222" }}
        onChangeText={(text) => updateFormState("workoutName", text)}
      />

      <View className="flex flex-row justify-between items-start self-stretch">
        {/* Routine Type Tags */}
        <View className="flex flex-col gap-4">
          <Text className="text-white font-medium" style={{ fontSize: 16 }}>
            Exercise Type
          </Text>
          <View className="flex flex-row gap-2">
            {["rehab", "prehab", "misc"].map((tag) => (
              <Tag
                key={tag}
                color="#4B4B4B"
                text={tag}
                selected={formState.selectedTag === tag}
                handlePress={() => updateFormState("selectedTag", tag)}
              />
            ))}
          </View>
        </View>
        {/* Difficulty selection */}
        <View className="flex flex-col gap-4 w-40">
          <Text className="text-white font-medium" style={{ fontSize: 16 }}>
            Difficulty
          </Text>

          <View className="flex flex-row gap-2">
            <IconButton
              icon={
                <Ionicons
                  size={16}
                  name={"remove-outline"}
                  color={
                    formState.selectedDifficulty === "easy" ? "#4B4B4B" : "#FFF"
                  }
                />
              }
              handlePress={() => decrementDifficulty()}
              disabled={formState.selectedDifficulty === "easy"}
              theme="dark"
            />
            <View className="flex flex-1 justify-center items-center">
              <Text
                className={`text-center capitalize ${getTextColor(
                  formState.selectedDifficulty
                )}`}
              >
                {formState.selectedDifficulty}
              </Text>
            </View>
            <IconButton
              icon={
                <Ionicons
                  size={16}
                  name={"add-outline"}
                  color={
                    formState.selectedDifficulty === "challenging"
                      ? "#4B4B4B"
                      : "#FFF"
                  }
                />
              }
              handlePress={() => incrementDifficulty()}
              disabled={formState.selectedDifficulty === "challenging"}
              theme="dark"
            />
          </View>
        </View>
      </View>

      <LabeledInput
        label="Injury"
        placeholder="Shoulder, Rotator Cuff"
        value={formState.injury}
        theme="dark"
        labelStyle={{ color: "#FFF", fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: "#222222" }}
        onChangeText={(text) => updateFormState("injury", text)}
      />

      {/* Sets Input */}
      <Text className="text-white text-lg font-medium">
        {formState.numSets || "0"} Sets{"  "}|{"  "}
        <Text>{getRepRange()}</Text>
      </Text>

      <View className="flex flex-row flex-1 items-center gap-4">
        <View className="flex flex-row justify-between self-stretch w-24">
          <LabeledInput
            placeholder="0"
            unit="Sets"
            value={formState.numSets}
            onChangeText={(text) => updateFormState("numSets", text)}
            keyboardType="numeric"
            theme="dark"
            labelStyle={{ color: "#FFF", fontSize: 16 }}
            inputContainerStyle={{ backgroundColor: "#222222" }}
          />
        </View>

        <View className="flex flex-row flex-1">
          <RangeSlider
            className="w-full"
            min={0}
            max={20}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        </View>
      </View>

      {/* Exercise instructions */}
      <LabeledInput
        label="Exercise Notes"
        placeholder="Write instructions, comments, or notes here..."
        value={formState.instructions}
        theme="dark"
        labelStyle={{ color: "#FFF", fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: "#222222" }}
        onChangeText={(text) => updateFormState("instructions", text)}
        multiline={true}
        numberOfLines={8}
      />
    </View>
  );
};

// Define types for JSON structure
interface Injury {
  name: string;
  description: string;
}

interface InjuryTypes {
  [key: string]: Injury[]; // e.g., "sprain": [{ name: "AC Joint Sprain", description: "..." }]
}

interface Region {
  region: string;
  injury_types: InjuryTypes;
}

interface Injuries {
  [key: string]: Region; // e.g., "neck": { region: "Neck", injury_types: { ... } }
}

interface FormState {
  selectedRegion: keyof Injuries | null; // Ensure this is a valid key of Injuries
  selectedType: string | null;
  injury?: string; // Optional field for the selected injury
}

interface InjurySelectorProps {
  formState: FormState;
  updateInjuryTag: (key: keyof FormState, value: string) => void;
}

const InjurySelector: React.FC<InjurySelectorProps> = ({
  formState,
  updateInjuryTag,
}) => {
  // Cast JSON as Injuries type
  const injuriesData: Injuries = injuries;

  // Extract regions dynamically
  const regions = Object.keys(injuriesData); // ["neck", "back", "shoulder", ...]

  return (
    <View>
      {/* Regions */}
      <View className="flex flex-col gap-4">
        <Text className="text-white font-medium" style={{ fontSize: 16 }}>
          Region
        </Text>

        <View className="flex flex-row flex-wrap gap-2">
          {regions.map((region) => (
            <Tag
              key={region}
              color="#4B4B4B"
              text={region}
              selected={formState.selectedRegion === region}
              handlePress={() => updateInjuryTag("selectedRegion", region)}
            />
          ))}
        </View>
      </View>

      {formState.selectedRegion ? (
        <>
          {/* Render Injury Types */}
          <View className="flex flex-col gap-4 mt-4">
            <Text className="text-white font-medium" style={{ fontSize: 16 }}>
              Injury Type
            </Text>
            <View className="flex flex-row flex-wrap gap-2">
              {Object.keys(
                injuriesData[formState.selectedRegion]?.injury_types || {}
              ).map((type) => (
                <Tag
                  key={type}
                  color="#4B4B4B"
                  text={type}
                  selected={formState.selectedType === type}
                  handlePress={() => updateInjuryTag("selectedType", type)}
                />
              ))}
            </View>
          </View>

          {/* Render Injuries under Selected Type */}
          {formState.selectedType && (
            <>
              <View className="flex flex-col gap-4 mt-4">
                <Text
                  className="text-white font-medium"
                  style={{ fontSize: 16 }}
                >
                  Injuries (
                  {injuriesData[formState.selectedRegion]?.injury_types[
                    formState.selectedType
                  ]?.length || 0}
                  )
                </Text>
                <View className="flex flex-row flex-wrap gap-2">
                  {injuriesData[formState.selectedRegion]?.injury_types[
                    formState.selectedType
                  ]?.map((injury) => (
                    <InjuryCard
                      key={injury.name}
                      injuryName={injury.name}
                      injuryDescription={injury.description}
                      backgroundColor="#1D1D1D"
                    />
                  ))}
                </View>
              </View>
            </>
          )}
        </>
      ) : null}
    </View>
  );
};
