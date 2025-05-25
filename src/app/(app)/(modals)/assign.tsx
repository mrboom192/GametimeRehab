import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { auth } from "@/firebaseConfig";
import { useUser } from "@/src/contexts/UserContext";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/contexts/CartContext";

const Assign = () => {
  const id = auth.currentUser?.uid;
  const { data } = useUser();
  const { cart, setCart } = useCart();

  const toggleSelectAthlete = (athlete: any) => {
    setCart((prev) => {
      const isSelected = prev.assigneeIds.includes(athlete.uid);

      const updatedAssignees = isSelected
        ? prev.assignees.filter((a) => a.uid !== athlete.uid)
        : [...prev.assignees, athlete];

      const updatedAssigneeIds = isSelected
        ? prev.assigneeIds.filter((id) => id !== athlete.uid)
        : [...prev.assigneeIds, athlete.uid];

      return {
        ...prev,
        assignees: updatedAssignees,
        assigneeIds: updatedAssigneeIds,
      };
    });
  };

  const isSelected = (uid: string) => cart.assigneeIds.includes(uid);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 16,
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
        paddingTop: 24,
      }}
    >
      <Text style={{ fontFamily: "dm-sb", fontSize: 20, marginBottom: 8 }}>
        Select Athletes
      </Text>

      {data?.athletes?.map((athlete: any) => (
        <TouchableOpacity
          key={athlete.uid}
          onPress={() => toggleSelectAthlete(athlete)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            backgroundColor: isSelected(athlete.uid)
              ? Colors.primary
              : Colors.faintGrey,
            borderRadius: 12,
            gap: 12,
          }}
        >
          <Image
            source={{ uri: athlete.image }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: isSelected(athlete.uid) ? "#FFF" : "#000",
            }}
          >
            {athlete.first_name} {athlete.last_name}
          </Text>
        </TouchableOpacity>
      ))}

      {cart.assigneeIds.length > 0 && (
        <Text
          style={{
            fontSize: 14,
            color: Colors.grey,
            marginTop: 16,
            fontFamily: "dm",
          }}
        >
          Selected: {cart.assigneeIds.length}
        </Text>
      )}
    </View>
  );
};

export default Assign;
