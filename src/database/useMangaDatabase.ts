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

export type SavedChapter = {
  id: string;
  chapNumber: number;
  read: boolean;
  savedMangaId: string;
};

export type MangaCodeUpdate = {
  id: string;
  name: string;
  githubLink: string;
  version: string;
  fetchMangas: string;
};

export function useMangaDatabase() {
  const database = useSQLiteContext();

  async function getAllCategories() {
    try {
      const query = `SELECT * FROM categories;`;

      const result = await database.getAllAsync<Category>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function getAllCodes() {
    try {
      const query = `SELECT * FROM mangaCodeUpdates;`;

      const result = await database.getAllAsync<MangaCodeUpdate>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function saveCode(data: Omit<MangaCodeUpdate, "id">) {
    try {
      const existing = await database.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM mangaCodeUpdates WHERE name = ?;",
        [data.name]
      );

      if (existing && existing?.count > 0) {
        throw new Error(`Já existe um código salvo com o nome "${data.name}".`);
      }

      const statement = await database.prepareAsync(
        "INSERT INTO mangaCodeUpdates (name, githubLink, version, fetchMangas) VALUES ($name, $githubLink, $version, $fetchMangas);"
      );

      const result = await statement.executeAsync({
        $name: data.name,
        $githubLink: data.githubLink,
        $version: data.version,
        $fetchMangas: data.fetchMangas,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async function getCodeById(id: string) {
    try {
      const query = `SELECT * FROM mangaCodeUpdates WHERE id = ?;`;

      const result = await database.getFirstAsync<MangaCodeUpdate>(query, id);
      return result;
    } catch (error) {
      throw error;
    }
  }

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

      return result;
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  return {
    saveManga,
    searchMangaByName,
    getAllCategories,
    getAllCodes,
    saveCode,
    getCodeById,
  };
}
