import { View, Text, StyleSheet } from "react-native";
import React from "react";

const RecoveryProgressBar = ({
  title = "Scheduled recovery",
  progress = 0,
  height = 10,
  color = "#F1744D",
  backgroundColor = "#E9EDE5",
}) => {
  return (
    <View>
      <Text>{title}</Text>
      <View style={[styles.container, { backgroundColor, height }]}>
        <View
          style={[
            styles.progress,
            { width: `${progress}%`, backgroundColor: color, height },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 5,
  },
});

export default RecoveryProgressBar;
