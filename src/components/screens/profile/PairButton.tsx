import { TouchableOpacity } from "react-native";
import { useUser } from "@/src/contexts/UserContext";
import { router } from "expo-router";
import { TextRegular, TextSemiBold } from "../../StyledText";

const PairButton = () => {
  const { data } = useUser();

  if (!data) return null;

  return (
    <TouchableOpacity
      className={`rounded-lg overflow-hidden py-4 px-6 justify-center flex-row items-center bg-[#2C2C2C]`}
      accessibilityLabel={"Pair with trainer"}
      onPress={() => router.push({ pathname: "/(app)/(profile)/pair" })}
    >
      <TextSemiBold className={`capitalize font-semibold text-white`}>
        {data.type === "trainer" ? "Pairing requests" : "Pair with trainer"}
      </TextSemiBold>
    </TouchableOpacity>
  );
};

export default PairButton;
