import { MangaCodeUpdate, useMangaDatabase } from "@/database/useMangaDatabase";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Added() {
  const mangaDatabase = useMangaDatabase();

  const [origins, setOrigins] = React.useState<MangaCodeUpdate[]>([]);

  const listOrigins = async () => {
    try {
      const result = await mangaDatabase.getAllCodes();

      setOrigins(result);
    } catch (error) {
      console.error("Erro ao obter fontes adicionadas:", error);
    }
  };

  React.useEffect(() => {
    listOrigins();
  }, []);

  return (
    <View>
      <FlatList
        data={origins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 25,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  backgroundColor: "#2196F3",
                }}
              />

              <View style={{ display: "flex", gap: 5 }}>
                <Text style={{ color: "#FFFFFF" }}>{item.name}</Text>
                <Text style={{ color: "#FFFFFF" }}>{item.version}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push(`/origins/list-manga/${item.id}`)}
            >
              <Text style={{ color: "#2196F3" }}>Recentes</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ padding: 20 }}
      />
    </View>
  );
}
