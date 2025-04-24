import { FlatList } from "react-native";
import React from "react";
import { Exercise } from "@/src/types/utils";
import ExerciseCard from "./ExerciseCard";

type Props = {
  data: Exercise[];
  onEndReached: () => void;
  cart: Exercise[];
  onAdd: (item: Exercise) => void;
  onRemove: (item: Exercise) => void;
  onOpen: (item: Exercise) => void;
  ListEmptyComponent?: any;
};

const ExerciseList = ({
  data,
  onEndReached,
  cart,
  onAdd,
  onRemove,
  onOpen,
  ListEmptyComponent,
}: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      contentContainerStyle={{ marginHorizontal: 16, paddingBottom: 128 }}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => {
        const isInCart = cart.some((cartItem) => cartItem.id === item.id);
        return (
          <ExerciseCard
            item={item}
            isInCart={isInCart}
            onAdd={onAdd}
            onRemove={onRemove}
            onOpen={onOpen}
          />
        );
      }}
    />
  );
};

export default ExerciseList;
