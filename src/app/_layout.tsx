import { SQLiteProvider } from "expo-sqlite";
import initializeDatabase from "../database/initializeDatabase";
import { Slot } from "expo-router";

export default function layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
