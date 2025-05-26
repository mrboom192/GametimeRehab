import React from "react";
import { TouchableOpacity } from "react-native";
import { useUser } from "@/src/contexts/UserContext";
import { router } from "expo-router";
import { TextRegular, TextSemiBold } from "../../StyledText";

const AddInjuryButton = () => {
  const { data } = useUser();

  if (!data) return null;

  return (
    <TouchableOpacity
      className={`rounded-lg overflow-hidden py-4 px-6 justify-center flex-row items-center border border-[#2C2C2C] mb-4`}
      accessibilityLabel={"Pair with trainer"}
      onPress={() => router.push({ pathname: "/(app)/(profile)/add-injury" })}
    >
      <TextSemiBold className={`capitalize font-semibold text-[#2C2C2C]`}>
        Add injury
      </TextSemiBold>
    </TouchableOpacity>
  );
};

export default AddInjuryButton;
