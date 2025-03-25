import React, { ReactNode, useState } from "react";
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

const HoldToStartButton = ({
  onComplete,
  duration = 1000,
  baseColor = Colors.green,
  overlayColor = "#FFF",
  baseIcon = <Ionicons name="play" size={16} color={baseColor} />,
  overlayIcon = <Ionicons name="play" size={16} color={overlayColor} />,
  text = "Hold to start",
}: {
  onComplete: () => void;
  duration?: number;
  baseColor?: string;
  overlayColor?: string;
  baseIcon?: ReactNode;
  overlayIcon?: ReactNode;
  text?: string;
}) => {
  const progress = useSharedValue(0);
  const isHolding = useSharedValue(false);
  const buttonWidth = useSharedValue(0);
  const [width, setWidth] = useState<number>();

  const animatedStyle = useAnimatedStyle(() => ({
    width: buttonWidth.value * progress.value,
  }));

  const startHold = () => {
    isHolding.value = true;
    progress.value = withTiming(
      1,
      {
        duration: duration,
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
    const layoutWidth = event.nativeEvent.layout.width;
    setWidth(layoutWidth);
    buttonWidth.value = layoutWidth;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={startHold}
      onPressOut={cancelHold}
      style={[styles.buttonContainer, { borderColor: baseColor }]}
      onLayout={onLayout}
    >
      <Animated.View
        style={[styles.fill, { backgroundColor: baseColor }, animatedStyle]}
      />

      {/* Green text */}
      <View style={styles.content}>
        <Text
          style={[styles.text, { color: baseColor, borderColor: baseColor }]}
          numberOfLines={1}
        >
          {text}
        </Text>
        {baseIcon}
      </View>

      {/* For white text effect */}
      <Animated.View style={[styles.contentOverlay, animatedStyle]}>
        <View
          style={{
            width: width,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text
            style={[styles.text, { color: overlayColor }]}
            numberOfLines={1}
          >
            {text}
          </Text>
          {overlayIcon}
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
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
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
