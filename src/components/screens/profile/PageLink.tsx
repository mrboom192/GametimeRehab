import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { TextRegular, TextSemiBold } from "../../StyledText";
import { RelativePathString, router } from "expo-router";
import Colors from "@/src/constants/Colors";

const PageLink = ({
  title,
  description,
  href,
  bottomBorder = true,
}: {
  title: string;
  description: string;
  href: RelativePathString;
  bottomBorder?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(href);
      }}
      style={{
        paddingVertical: 16,
        borderBottomWidth: bottomBorder ? 1 : 0,
        borderColor: Colors.faintGrey,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <TextSemiBold style={{ fontSize: 16, color: "#000" }}>
            {title}
          </TextSemiBold>
          <TextRegular
            style={{
              fontSize: 14,
              color: "#555",
              marginTop: 2,
            }}
          >
            {description}
          </TextRegular>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

export default PageLink;
