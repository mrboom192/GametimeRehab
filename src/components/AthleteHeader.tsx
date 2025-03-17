import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import * as Haptics from "expo-haptics";
import { useUser } from "../contexts/UserContext";
import { StatusBar } from "expo-status-bar";
import athleteBackground from "@/assets/images/athletebackground1.png";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";

const Header = ({
  tabs,
  onTabChange,
}: {
  tabs: string[];
  onTabChange: (tabName: string) => void;
}) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const { userInfo } = useUser(); // Assume useUser provides a loading state
  const router = useRouter();
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { height } = Dimensions.get("window");

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x: number) => {
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
        height: height * 0.45,
        width: "100%",
        position: "relative",
      }}
    >
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(255,255,255, 1)"]}
        start={{ x: 1, y: 0.65 }} // Adjusts where the gradient begins
        end={{ x: 1, y: 0.9 }} // Adjusts where it ends
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height, // Adjust height for desired fade effect
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

            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#FFF",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
              }}
            >
              <Text className="text-xl text-black">
                {userInfo?.first_name?.[0] || "?"}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", gap: 16 }}>
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
                        : { color: Colors.light.grey },
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
