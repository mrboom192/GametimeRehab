import { View, Text, Pressable } from "react-native";
import React from "react";

// Define types for the props
interface QuestionnaireProps {
  title: string;
  question: string;
  options: string[];
  state: string | string[] | undefined;
  handleSelect: (answer: string) => void;
  note?: string;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  title = "",
  question = "",
  options = [],
  state,
  handleSelect,
  note,
}) => {
  return (
    <View className="flex flex-col self-stretch gap-8">
      <View className="flex flex-col gap-4">
        <Text className="text-[#2C2C2C] text-4xl capitalize">{title}</Text>
        <Text className="text-[#2C2C2C] text-xl">{question}</Text>
      </View>

      <View className="flex flex-col self-stretch gap-2">
        {note ? (
          <Text className="text-[#817C7C] text-sm italic">{note}</Text>
        ) : (
          <></>
        )}
        {options.map((option) => {
          const isSelected = Array.isArray(state)
            ? state.includes(option)
            : state === option;

          return (
            <Pressable
              className={`py-2.5 px-3 flex flex-row self-stretch items-center justify-start rounded-lg border ${
                isSelected
                  ? "bg-[#2C2C2C] border-[#2C2C2C]"
                  : "bg-white border-[#717171]"
              }`}
              onPress={() => handleSelect(option)}
              key={option}
            >
              <Text
                className={`${isSelected ? "text-white" : "text-[#2C2C2C]"}`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Questionnaire;
