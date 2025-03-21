import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { useCart } from "@/src/contexts/CartContext";
import Colors from "@/src/constants/Colors";
import { Exercise } from "@/src/types/utils";
import { Link } from "expo-router";

const Page = () => {
  const { cart, setCart } = useCart();

  const handleAdd = (item: Exercise) => {
    setCart((old) => [...old, item]);
  };

  const handleRemove = (item: Exercise) => {
    setCart((old) => old.filter((cartItem) => cartItem.id !== item.id));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 16,
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
      }}
    >
      {cart.length === 0 ? (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "dm-sb",
            color: Colors.grey2,
          }}
        >
          No routines.
        </Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 200 }} // To account for the footer
          renderItem={({ item }) => {
            const isInCart = cart.some((cartItem) => cartItem.id === item.id);
            return (
              <View
                style={{
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  borderColor: Colors.faintGrey,
                }}
              >
                {/* The exercise image */}
                <Image
                  source={{
                    uri: item.image_dark,
                  }}
                  style={{
                    width: 96,
                    height: 96,
                    marginRight: 16,
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "dm-sb",
                        marginBottom: 4,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.grey2,
                      }}
                    >
                      {item.tags[0]
                        ?.split(" ")
                        .map(
                          (word: string) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/(app)/(modals)/[exercise-id]",
                        params: { id: item.id },
                      }}
                      asChild
                    >
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderColor: Colors.grey2,
                          borderRadius: 9999,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "dm-sb",
                            fontSize: 12,
                            color: Colors.grey2,
                          }}
                        >
                          Details
                        </Text>
                      </TouchableOpacity>
                    </Link>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Colors.red,
                        borderWidth: 1,
                        borderColor: Colors.red,
                        borderRadius: 9999,
                      }}
                      onPress={() =>
                        isInCart ? handleRemove(item) : handleAdd(item)
                      }
                    >
                      <Text
                        style={{
                          fontFamily: "dm-sb",
                          fontSize: 12,
                          color: "#FFF",
                        }}
                      >
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          paddingVertical: 16,
          paddingHorizontal: 16,
          flexDirection: "column",
          gap: 8,
          borderTopColor: Colors.faintGrey,
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors.dark,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: Colors.dark,
            }}
          >
            Add to Routine
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            backgroundColor: Colors.dark,
            borderColor: Colors.dark,
            borderRadius: 8,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontFamily: "dm-sb",
              fontSize: 16,
              color: "#FFF",
            }}
          >
            Create Routine
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
