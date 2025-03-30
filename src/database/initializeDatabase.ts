import { type SQLiteDatabase } from "expo-sqlite";

export default async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        orderKanban INTEGER UNIQUE NOT NULL
      );`
    );

    const result = await database.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM categories;"
    );

    if (result?.count === 0) {
      await database.runAsync(
        "INSERT INTO categories (id, name, orderKanban) VALUES (?, ?, ?);",
        [crypto.randomUUID(), "Default", 1]
      );
    }
  } catch (error) {
    console.error("Erro ao inicializar categorias:", error);
  }

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS savedMangas (
        id TEXT PRIMARY KEY, 
        title TEXT NOT NULL, 
        lastChapterReaded INTEGER NOT NULL, 
        origin TEXT NOT NULL, 
        img TEXT NOT NULL, 
        categoryId TEXT NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE CASCADE
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS savedChapters (
        id TEXT PRIMARY KEY,
        chapNumber INTEGER NOT NULL,
        read BOOLEAN NOT NULL DEFAULT 0,
        savedMangaId TEXT NOT NULL,
        FOREIGN KEY (savedMangaId) REFERENCES savedMangas (id) ON DELETE CASCADE
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS mangaCodeUpdates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        githubLink TEXT NOT NULL,
        savedHash TEXT, 
        savedCode TEXT
    );`
  );
}
