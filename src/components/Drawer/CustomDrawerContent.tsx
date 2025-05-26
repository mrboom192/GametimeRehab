import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TextRegular, TextSemiBold } from "../StyledText";
import PageLink from "../screens/profile/PageLink";
import PairButton from "../screens/profile/PairButton";
import { RelativePathString } from "expo-router";
import IconButton from "../buttons/IconButton";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserAvatar from "../UserAvatar";
import { useUser } from "@/src/contexts/UserContext";
import { useSession } from "@/src/contexts/AuthContext";
import AddInjuryButton from "../screens/profile/AddInjuryButton";

function CustomDrawerContent(props: any) {
  const { data } = useUser();
  const { signOut } = useSession();

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => {}} /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <UserAvatar canUpload={true} size={64} />
          <TextSemiBold style={{ fontSize: 24 }}>
            {data?.first_name} {data?.last_name}
          </TextSemiBold>
        </View>

        <IconButton
          icon={<Ionicons size={24} name={"log-out-outline"} color="#f56565" />}
          handlePress={() => signOut()}
          theme="light"
        />
      </View>

      <PageLink
        title={"Account info"}
        description={"View your personal account information"}
        href={"/(app)/(profile)/account-info" as RelativePathString}
      />

      <PageLink
        title={"Privacy Policy"}
        description={"View our Privacy Policy"}
        href={"/privacy-policy" as RelativePathString}
      />

      <PageLink
        title={"Terms of Service"}
        description={"View our Terms of Service"}
        href={"/terms" as RelativePathString}
        bottomBorder={false}
      />

      {data?.type === "athlete" && <AddInjuryButton />}

      <PairButton />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
