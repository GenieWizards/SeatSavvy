import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import theatreSchema from "./theatre.schema";

const theatreHallSchema = sqliteTable("cities", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: text("name").notNull(),
  totalSeats: int("total_seats").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  address: text("address").notNull(),

  theatreId: text("theatre_id").references(() => theatreSchema.id),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export default theatreHallSchema;
