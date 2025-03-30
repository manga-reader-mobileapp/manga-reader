import { useSQLiteContext } from "expo-sqlite";

export type Category = {
  id: string;
  name: string;
  orderKanban: number;
};

export type SavedManga = {
  id: string;
  title: string;
  lastChapterReaded: number;
  origin: string;
  img: string;
  categoryId: string;
};

export function useMangaDatabase() {
  const database = useSQLiteContext();

  async function saveManga(data: Omit<SavedManga, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO savedMangas (title, lastChapterReaded, origin, img, categoryId) VALUES ($title, $lastChapterReaded, $origin, $img, $categoryId);"
    );

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $lastChapterReaded: data.lastChapterReaded,
        $origin: data.origin,
        $img: data.img,
        $categoryId: data.categoryId,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchMangaByName(name: string) {
    try {
      const query = `SELECT title, img FROM savedMangas WHERE title LIKE ?`;

      const result = await database.getAllAsync<{ title: string; img: string }>(
        query,
        `%${name}%`
      );

      return Response;
    } catch (error) {
      throw error;
    }
  }

  return {
    saveManga,
    searchMangaByName,
  };
}
