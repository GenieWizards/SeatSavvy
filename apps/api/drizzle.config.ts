import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema",
  dialect: "sqlite",
  out: "./src/db/migrations",
  dbCredentials: {
    url: ".src/db/seatsavvy.db",
  },
  verbose: true,
  strict: true,
});
