import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <GestureHandlerRootView style={styles.container}>
      <Tabs.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="mt-24">
        <Button title="Open survey" onPress={() => handleSnapPress(0)} />
        <Button title="Close" onPress={() => handleClosePress()} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={styles.bottomSheet}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View className="flex flex-col justify-between items-center h-[2000px]">
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: { backgroundColor: "#55a" },
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    backgroundColor: "#55a",
  },
});

export default App;
