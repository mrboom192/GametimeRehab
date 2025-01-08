import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface LabeledInputProps extends TextInputProps {
  label: string;
  labelRight?: React.ReactNode; // Optional content to display next to the label
  icon?: React.ReactNode; // Optional icon to display in the input
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  icon,
  placeholder = "Enter text",
  onChangeText,
  labelRight,
  label,
  value,
  ...inputProps
}) => {
  return (
    <View className="w-full flex-col items-start gap-2">
      {/* Label Section */}
      <View className="flex-row justify-between w-full items-center">
        <Text className="text-slate-700 text-sm font-medium">{label}</Text>
        {labelRight}
      </View>

      {/* Input Section */}
      <View className="flex-row items-center w-full py-2 px-4 bg-white rounded-lg border border-[#B8B8B8] gap-2">
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#717171"
          underlineColorAndroid="transparent"
          className="flex-1 py-2 px-0 bg-white text-black max-h-9"
          {...inputProps}
        />
      </View>
    </View>
  );
};

export default LabeledInput;
