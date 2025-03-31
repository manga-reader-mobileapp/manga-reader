import MangaList from "@/components/manga/mangalist";
import Menu from "@/components/menu";
import { Category, useMangaDatabase } from "@/database/useMangaDatabase";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const mangaDatabase = useMangaDatabase();

  const [categories, setCategories] = React.useState<Category[]>([]);

  const listCategories = async () => {
    try {
      const result = await mangaDatabase.getAllCategories();
      setCategories(result);

      setSelectedCategory(result[0].id);
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
    }
  };

  React.useEffect(() => {
    listCategories();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#212121",
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 25 }}>Library</Text>
        <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Search</Text>
      </View>

      {/* Content Area */}
      <View
        style={{
          flex: 1,
          paddingTop: 15,
          width: "100%",
          borderRadius: 8,
        }}
      >
        {/* Categories */}
        <View style={{ marginBottom: 15, paddingHorizontal: 20 }}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.id)}
                style={{
                  marginRight: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor:
                    selectedCategory === item.id ? "#323232" : "transparent",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    textAlign: "center",
                    fontWeight:
                      selectedCategory === item.id ? "bold" : "normal",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            style={{ flexGrow: 0 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Manga List */}
        <View style={{ flex: 1 }}>
          <MangaList />
        </View>
      </View>

      {/* Bottom Menu */}
      <Menu />
    </View>
  );
}
