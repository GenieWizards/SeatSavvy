import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { closeConnection, db } from "./index";

migrate(db, { migrationsFolder: "src/db/migrations" }); // Relative path does not work

closeConnection();
