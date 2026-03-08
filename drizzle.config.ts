// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // Tell drizzle we are using Postgres
  schema: "./src/db/schema.ts", // Point this to your schema file
  out: "./drizzle", // This is where your migration files will live
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use the same URL from your .env
  },
});