import {
  Text,
  ScrollView,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RelativePathString, router, Tabs } from "expo-router";
import { useUser } from "@/src/contexts/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import LabeledInput from "@/src/components/LabeledInput";
import NavigateButton from "@/src/components/buttons/NavigateButton";
import IconButton from "@/src/components/buttons/IconButton";
import { useSession } from "@/src/contexts/AuthContext";
import UserAvatar from "@/src/components/UserAvatar";
import Colors from "@/src/constants/Colors";
import { TextRegular, TextSemiBold } from "@/src/components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { data } = useUser();
  const { signOut } = useSession();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFF" }}
        contentContainerStyle={{
          flexDirection: "column",
          backgroundColor: "#FFF",
          padding: 16,
          paddingBottom: 128,
        }}
        overScrollMode="never" // android only
      >
        <Tabs.Screen options={{ headerShown: false }} />

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
            icon={
              <Ionicons size={24} name={"log-out-outline"} color="#f56565" />
            }
            handlePress={() => signOut()}
            theme="light"
          />
        </View>

        <PageLink
          title={"Account info"}
          description={"View your personal account information"}
          href={"/profile/account-info" as RelativePathString}
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

        <PairButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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

const PairButton = () => {
  const { data } = useUser();

  return data.type === "athlete" ? (
    <View style={{ marginTop: 16 }} className="mb-32">
      <NavigateButton
        href="/profile/pair"
        title="pair with trainer"
        theme="dark"
      />
    </View>
  ) : (
    <View className="mb-32">
      <NavigateButton
        href="/profile/pair"
        title={`${data.pending_requests.length} pair ${
          data.pending_requests.length === 1 ? "request" : "requests"
        } `}
        theme="dark"
      />
    </View>
  );
};
