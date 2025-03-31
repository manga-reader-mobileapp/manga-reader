import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import MangaCard from "./mangaExibition";

export type MangaCard = {
  id: string;
  title: string;
  img: string;
  chapters: string;
};

const MangaList = ({ mangaData }: { mangaData: MangaCard[] }) => {
  // Verifica se a lista de mangás está vazia
  if (mangaData && mangaData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Não possui mangás.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={mangaData}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <MangaCard title={item.title} img={item.img} chapters={item.chapters} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  listContainer: {
    padding: 10,
  },
});

export default MangaList;
