import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/src/contexts/UserContext";

const Page = () => {
  const [pain, setPain] = useState(null);
  const { data } = useUser();

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello {data.first_name}!</Text>
      <Text>Daily Pain Questionnaire</Text>
    </View>
  );
};

export default Page;
