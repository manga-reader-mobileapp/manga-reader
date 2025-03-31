import { type SQLiteDatabase } from "expo-sqlite";

export default async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`DROP TABLE IF EXISTS savedChapters;`);
    await database.execAsync(`DROP TABLE IF EXISTS savedMangas;`);
    await database.execAsync(`DROP TABLE IF EXISTS categories;`);
    await database.execAsync(`DROP TABLE IF EXISTS mangaCodeUpdates;`);

    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        orderKanban INTEGER UNIQUE NOT NULL
      );`
    );

    const result = await database.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM categories;"
    );

    if (result?.count === 0) {
      // Inserindo uma categoria com ID autoincrementado (não é necessário fornecer o ID, o SQLite gera automaticamente)
      await database.runAsync(
        "INSERT INTO categories (id, name, orderKanban) VALUES (?,?, ?);",
        [1, "Default", 1]
      );
    }
  } catch (error) {
    console.error("Erro ao inicializar categorias:", error);
  }

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS savedMangas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chapNumber INTEGER NOT NULL,
        read BOOLEAN NOT NULL DEFAULT 0,
        savedMangaId TEXT NOT NULL,
        FOREIGN KEY (savedMangaId) REFERENCES savedMangas (id) ON DELETE CASCADE
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS mangaCodeUpdates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        githubLink TEXT NOT NULL,
        version TEXT, 
        fetchMangas TEXT
    );`
  );
}
