import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PageScrollView from "@/src/components/PageScrollView";
import ControllerInput from "@/src/components/ControllerInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SubmitHandler, useForm } from "react-hook-form";
import ControllerDatePicker from "@/src/components/ControllerDatePicker";
import { TextRegular, TextSemiBold } from "@/src/components/StyledText";
import Colors from "@/src/constants/Colors";
import ControllerCheckBoxOptions from "@/src/components/ControllerCheckBoxOptions";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useUser } from "@/src/contexts/UserContext";

const AddInjury = () => {
  const { data: userData } = useUser();
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {},
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    setSubmitting(true);

    try {
      if (!userData?.uid) {
        console.error("User ID is missing");
        setSubmitting(false);
        return;
      }

      const userInjuriesRef = collection(db, "users", userData.uid, "injuries");

      await addDoc(userInjuriesRef, {
        location: data.location,
        date: data.date, // Assuming ControllerDatePicker returns a Firestore Timestamp
        pain: Number(data.pain),
        type: data.type,
        description: data.description,
        symptoms: data.symptoms,
        createdAt: new Date(),
      });

      console.log("Injury successfully added!");
      router.back(); // Navigate back
    } catch (error) {
      console.error("Error creating injury:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <ControllerInput
        control={control}
        rules={{
          required: "Please enter a location.",
        }}
        name="location"
        label={"Injury location"}
        placeholder={"e.g. left ankle"}
      />
      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <ControllerDatePicker
            control={control}
            rules={{
              required: "Invalid",
            }}
            name="date"
            label={"Date injured"}
            placeholder={"Date"}
            formatDate="MM/dd/yy"
          />
        </View>
        <View style={{ flex: 1 }}>
          <ControllerInput
            control={control}
            rules={{
              required: "Invalid",
              // Minimum 1, maximum 10
              min: { value: 1, message: "Min is 1" },
              max: { value: 10, message: "Max is 10" },
            }}
            name="pain"
            label={"Pain level (1-10)"}
            placeholder={"e.g. 1"}
            keyboardType="numeric"
          />
        </View>
      </View>

      <ControllerCheckBoxOptions
        label="Categorize your injury"
        name="type"
        control={control}
        options={[
          "Sprain",
          "Strain",
          "Fracture",
          "Tendonitis",
          "Tear",
          "Dislocation",
          "Contusion",
          "Concussion",
          "Other",
        ]}
        singleSelect
        rules={{ required: "Please select at least one option." }}
      />

      <ControllerInput
        control={control}
        name="description"
        label={"Describe the injury"}
        placeholder={"How did it happen, give a brief description"}
        textInputStyle={{ height: 100 }}
        multiline
      />

      <ControllerCheckBoxOptions
        label="Select Your symptoms"
        name="symptoms"
        control={control}
        options={[
          "Swelling",
          "Bruising",
          "Limited mobility",
          "Numbness",
          "Other",
        ]}
        rules={{ required: "Please select at least one option." }}
      />

      <TextRegular style={styles.disclaimer}>
        Your trainer will now review your injury and provide a recovery plan,
        including an expected return date, routines, and exercises. Hang tight
        while they assess your details!
      </TextRegular>

      <TouchableOpacity
        style={[styles.submitButton, submitting && { opacity: 0.5 }]}
        accessibilityLabel={"Submit injury form"}
        disabled={submitting}
        onPress={handleSubmit(onSubmit, (errors) => {
          console.log("Validation errors:", errors);
        })}
      >
        <TextSemiBold style={styles.submitText}>Submit</TextSemiBold>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default AddInjury;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    position: "relative",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  disclaimer: {
    color: Colors.lightText,
    fontSize: 12,
    marginTop: 48,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: Colors.dark,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 64,
    alignSelf: "center",
    width: "100%",
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
  },
});
