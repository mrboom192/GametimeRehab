import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { TextRegular } from "./StyledText";
import Colors from "../constants/Colors";

const ControllerDatePicker = ({
  control,
  name,
  rules = {},
  label,
  disabled = false,
  placeholder = "Select Date",
  formatDate = "MMMM d, yyyy",
}: {
  control: Control;
  name: string;
  rules?: any;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  formatDate?: string;
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View>
            <View style={styles.labelContainer}>
              <TextRegular style={styles.label}>{label}</TextRegular>
              {error && (
                <TextRegular style={styles.error}>{error?.message}</TextRegular>
              )}
            </View>

            <Pressable
              onPress={() => !disabled && setShowDatePicker(true)}
              style={[
                styles.inputContainer,
                { borderColor: error ? Colors.pink : Colors.faintGrey },
              ]}
            >
              <TextRegular
                style={{
                  color: value ? "#000" : Colors.lightText,
                }}
              >
                {value ? format(value, formatDate) : placeholder}
              </TextRegular>
              <Ionicons name="calendar-outline" size={20} color={Colors.grey} />
            </Pressable>

            <DatePicker
              modal
              mode="date"
              open={showDatePicker}
              date={value || new Date()}
              maximumDate={new Date()}
              onConfirm={(date) => {
                setShowDatePicker(false);
                onChange(date);
              }}
              onCancel={() => setShowDatePicker(false)}
            />
          </View>
        );
      }}
    />
  );
};

export default ControllerDatePicker;

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: Colors.black,
  },
  error: {
    color: Colors.pink,
    fontSize: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 16,
    justifyContent: "space-between",
  },
});
