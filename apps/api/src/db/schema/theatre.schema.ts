import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import citySchema from "./city.schema";

const theatreSchema = sqliteTable("cities", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: text("name").notNull(),
  totalTheatreHalls: int("total_theatre_halls").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const theatreRelations = relations(theatreSchema, ({ many }) => ({
  cities: many(citySchema),
}));

export default theatreSchema;
