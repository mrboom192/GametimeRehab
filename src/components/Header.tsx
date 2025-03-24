import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { ForwardRefExoticComponent, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import * as Haptics from "expo-haptics";
import { useUser } from "../contexts/UserContext";
import { StatusBar } from "expo-status-bar";
import athleteBackground from "@/assets/images/athletebackground1.png";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import Avatar from "./Avatar";

const HEADER_HEIGHT_PERCENTAGE = 0.475; // How much the space the header takes up as a pecentage of screen height
const GRADIENT_START = { x: 1, y: 0.65 }; // Adjust the gradient start/end
const GRADIENT_END = { x: 1, y: 0.905 };

const Header = ({
  tabs,
  onTabChange,
}: {
  tabs: string[];
  onTabChange: (tabName: string) => void;
}) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const { userInfo, loading } = useUser(); // Assume useUser provides a loading state
  const itemsRef = useRef<Array<typeof TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { height } = Dimensions.get("window");

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    (selected as any)?.measure((x: number) => {
      scrollRef.current?.scrollTo({
        x: x - 16,
        y: 0,
        animated: true,
      });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onTabChange(tabs[index]);
  };

  return (
    <ImageBackground
      source={athleteBackground}
      imageStyle={{ resizeMode: "cover" }}
      style={{
        height: height * HEADER_HEIGHT_PERCENTAGE,
        width: "100%",
        position: "relative",
      }}
    >
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(255,255,255, 1)"]}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height,
        }}
      />
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => console.log("Pressed!")}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Feather name="menu" size={40} color={"#FFF"} />
            </Pressable>

            <Avatar
              color="#FFF"
              uri={loading ? null : userInfo.image}
              size={48}
              initials={
                loading ? "?" : userInfo.first_name[0] + userInfo.last_name[0]
              }
            />
          </View>

          <View style={{ flexDirection: "column", gap: 8 }}>
            <View>
              {userInfo?.type === "athlete" ? (
                <View style={{ flexDirection: "row", gap: 6, marginLeft: 16 }}>
                  <Feather name="eye" size={20} color={"#A6A6A6"} />
                  <Text
                    style={{
                      fontFamily: "dm",
                      fontSize: 16,
                      color: "#A6A6A6",
                    }}
                  >
                    Athlete View
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <Text
                style={{
                  marginLeft: 16,
                  fontFamily: "dm-sb",
                  fontSize: 26,
                  color: "#2C2C2C",
                }}
              >
                Welcome back,{" "}
                <Text style={{ color: Colors.primary }}>
                  {userInfo?.first_name}!
                </Text>
              </Text>
            </View>

            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                paddingHorizontal: 16,
                gap: 30,
              }}
            >
              {tabs.map((tabName, index) => (
                <Pressable
                  onPress={() => selectCategory(index)}
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Text
                    style={[
                      activeIndex === index
                        ? { color: "#2C2C2C" }
                        : { color: Colors.grey },
                      { fontFamily: "dm", fontSize: 30 },
                    ]}
                  >
                    {tabName}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    gap: 10,
    justifyContent: "space-between",
  },
});

export default Header;
