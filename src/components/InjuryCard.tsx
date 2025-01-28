import { View, Text } from "react-native";
import React from "react";

const InjuryCard = ({
  injuryName = "Injury Placeholder Name",
  injuryDescription = "Injury Description Placeholder",
  backgroundColor = "#2C2C2C",
  checked = false,
}) => {
  return (
    <View
      className="inline-flex self-stretch p-3 justify-center items-start rounded-lg"
      style={{
        backgroundColor,
      }}
    >
      <View className="flex flex-row items-center justify-between gap-2 self-stretch mb-2">
        <View className="flex flex-row self-stretch gap-2 items-center">
          <Text className="text-white font-semibold" ellipsizeMode="tail">
            {injuryName}
          </Text>

          <Text>ONE RN</Text>
        </View>
      </View>
      <View className="flex flex-col mb-2">
        <Text className="text-white">{injuryDescription}</Text>
      </View>
    </View>
  );
};

export default InjuryCard;
