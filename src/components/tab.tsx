import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Tab({
  text,
  id,
  selectedId,
  setSelectedId,
}: {
  text: string;
  id: string;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (selectedId === id) return;

        setSelectedId(id);
      }}
      style={{
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: selectedId === id ? "#323232" : "transparent",
        borderRadius: 15,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 18,
          textAlign: "center",
          fontWeight: selectedId === id ? "bold" : "normal",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
