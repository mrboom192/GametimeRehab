import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface LabeledInputProps extends TextInputProps {
  label: string;
  note?: string;
  labelRight?: React.ReactNode; // Optional content to display next to the label
  icon?: React.ReactNode; // Optional icon to display in the input
  secureTextEntry?: boolean;
  error?: string; // Add this line to include the error prop
  unit?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  icon,
  placeholder = "Enter text",
  onChangeText,
  labelRight,
  label,
  note,
  value,
  error,
  unit,
  ...inputProps
}) => {
  return (
    <View className="w-full flex-col items-start gap-2">
      {/* Label Section */}
      <View className="flex-row justify-between w-full items-center">
        <View className="flex flex-row gap-4">
          <Text className="text-slate-700 text-sm font-medium">{label}</Text>
          {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
        </View>
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
        {unit ? <Text className="text-[#717171]">{unit}</Text> : <></>}
      </View>
      {note ? (
        <Text className="text-[#817C7C] text-sm italic">{note}</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default LabeledInput;
