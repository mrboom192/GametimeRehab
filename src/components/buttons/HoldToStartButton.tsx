import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  runOnJS,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/src/constants/Colors";

const HOLD_DURATION = 1000;

type Props = {
  onComplete: () => void;
};

const HoldToStartButton = ({ onComplete }: Props) => {
  const progress = useSharedValue(0);
  const isHolding = useSharedValue(false);
  const buttonWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: buttonWidth.value * progress.value,
  }));

  const startHold = () => {
    isHolding.value = true;
    progress.value = withTiming(
      1,
      {
        duration: HOLD_DURATION,
        easing: Easing.bezier(0, -0.05, 0.25, 1),
        reduceMotion: ReduceMotion.System,
      },
      (finished) => {
        if (finished && isHolding.value) {
          runOnJS(onComplete)();
        }
      }
    );
  };

  const cancelHold = () => {
    isHolding.value = false;
    cancelAnimation(progress);
    progress.value = withTiming(0, { duration: 300 });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    buttonWidth.value = width;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={startHold}
      onPressOut={cancelHold}
      style={styles.buttonContainer}
      onLayout={onLayout}
    >
      <Animated.View style={[styles.fill, animatedStyle]} />

      {/* Base content (green) */}
      <View style={styles.content}>
        <Text style={[styles.text, { color: Colors.green }]} numberOfLines={1}>
          Hold to start
        </Text>
        <Ionicons name="play" size={16} color={Colors.green} />
      </View>

      {/* For white text effect */}
      <Animated.View style={[styles.contentOverlay, animatedStyle]}>
        <View
          style={{
            width: buttonWidth.value,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text style={[styles.text, { color: "#FFF" }]} numberOfLines={1}>
            Hold to start
          </Text>
          <Ionicons name="play" size={16} color={"#FFF"} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.green,
    backgroundColor: "#FFF",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.green,
    zIndex: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contentOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 3,
  },
  text: {
    fontFamily: "dm-sb",
    fontSize: 12,
    flexShrink: 1,
  },
});

export default HoldToStartButton;
