import { MangaCodeUpdate, useMangaDatabase } from "@/database/useMangaDatabase";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import cheerio from "cheerio-without-node-native";
import MangaList from "@/components/manga/mangalist";

export default function ListManga() {
  const mangaDatabase = useMangaDatabase();

  const params = useLocalSearchParams<{ sourceId: string }>();

  const [mangaList, setMangaList] = React.useState<
    { id: string; title: string; img: string; chapters: string }[]
  >([]);

  const [myCode, setMyCode] = React.useState<MangaCodeUpdate>({
    id: params.sourceId,
    name: "",
    githubLink: "",
    version: "",
    fetchMangas: "",
  });

  const getCode = async () => {
    try {
      const result = await mangaDatabase.getCodeById(params.sourceId);

      if (!result) return;

      setMyCode(result.fetchMangas);
      fetchMangas();
    } catch (error) {
      console.error("Erro ao obter código:", error);
    }
  };

  React.useEffect(() => {
    getCode();
  }, [params.sourceId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MangaList mangaData={mangaList} />
    </View>
  );
}
