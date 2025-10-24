import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="storeKeeper.db"
      onInit={async (db) => {
        await db.execAsync(
          `CREATE TABLE IF NO EXISTING product()
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      image TEXT,
      );
      PRAGMA jornal_mode=WAL;
      `
        );
      }}
      options={{ useNewConnection: false }}
    >
      <Stack />
    </SQLiteProvider>
  );
}
