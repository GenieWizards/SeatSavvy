import { migrate } from "drizzle-orm/postgres-js/migrator";

import { env } from "@/env";
import config from "$/drizzle.config";

import { connection, db } from ".";

if (!env.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations',
  );
}

(async () => {
  await migrate(db, { migrationsFolder: config.out || "./migrations" });

  await connection.end();
})();
